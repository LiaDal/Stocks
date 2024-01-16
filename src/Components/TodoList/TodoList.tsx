import React, { useState, useEffect, useCallback } from "react";
import TodoItem from "../TodoItem/TodoItem.tsx";
import Button from "../Button/Button.ts";
import List from "./TodoListStyle.ts";
import Form from "../Form/FormStyle.tsx";
import Filters from "../Filters/Filters.ts";
import defValues from "../../models/todo.model.ts";
import { v4 as uuidv4 } from "uuid";
import EditForm from "../EditTask/EditForm.tsx";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
};

function TodoList() {
  const [tasks, setTasks] = useState<Todo[]>(defValues);
  const [text, setText] = useState<string>("");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(defValues);

  useEffect(() => {
    const storedTasks = JSON.parse(
      window.localStorage.getItem("tasks") as string
    );
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setFilteredTodos(tasks);
  }, [tasks]);

  const incompleteTasks = useCallback(() => {
    setFilteredTodos(tasks.filter((todo) => todo.completed === false));
  }, [tasks]);

  const completedTasks = useCallback(() => {
    setFilteredTodos(tasks.filter((todo) => todo.completed === true));
  }, [tasks]);

  const showAllTasks = useCallback(() => {
    setFilteredTodos(tasks);
  }, [tasks]);

  const addTask = useCallback(
    (text: string) => {
      const newTask = {
        id: uuidv4(),
        text,
        completed: false,
        isEditing: false,
      };
      setTasks([...tasks, newTask]);
      setText("");
    },
    [tasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks(tasks.filter((task) => task.id !== id));
    },
    [tasks]
  );

  const editTask = useCallback(
    (id: string) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      );
    },
    [tasks]
  );

  const saveTask = useCallback(
    (text: string, id: string) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text, isEditing: !task.isEditing } : task
        )
      );
    },
    [tasks]
  );

  const cancelEdit = useCallback(
    (id: string) => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      );
    },
    [tasks]
  );

  const toggleCompleted = useCallback(
    (id: string) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        })
      );
    },
    [tasks]
  );

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
      <Filters>
        <Button onClick={() => showAllTasks()}>Show All Tasks</Button>
        <Button onClick={() => incompleteTasks()}>Show Active Tasks</Button>
        <Button onClick={() => completedTasks()}>Show completed Tasks</Button>
      </Filters>
      <List>
        <h2>{filteredTodos.length} task(s) remaining</h2>
        {filteredTodos.map((task) =>
          task.isEditing ? (
            <EditForm
              saveTask={saveTask}
              task={task}
              key={task.id}
              cancelEdit={cancelEdit}
            />
          ) : (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              editTask={editTask}
            />
          )
        )}
      </List>
    </>
  );
}
export default TodoList;
