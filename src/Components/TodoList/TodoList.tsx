import React, { useState } from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import Button from "../Button/Button.ts";
import List from "./TodoListStyle.ts";
import Form from "../Form/FormStyle.tsx";
import defValues from "../../models/todo.model.ts";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>(defValues);
  const [text, setText] = useState<string>("");

  function addTask(text: string) {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setText("");
    console.log(newTask);
  }

  function deleteTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id: string) {
    console.log("edit");
  }

  function toggleCompleted(id: string) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  }

  return (
    <>
      <Form
        value={text}
        placeholder="New todo..."
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setText(e.target.value)
        }
      />
      <Button onClick={() => addTask(text)}>Add</Button>
      <List>
        <h2>{tasks.length} task(s) remaining</h2>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        ))}
      </List>
    </>
  );
}
export default TodoList;
