import React from "react";
import { useState } from "react";
import "./App.css";
import TodoInput from "./Components/TodoInput/TodoInput.tsx";
import TodoList from "./Components/TodoList/TodoList.tsx";

function App() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const addTask = () => {
    if (taskList) {
      setTaskList([...taskList, task]);
      setTask("");
    }
  };

  const deleteTask = (text) => {
    const newList = taskList.filter((todo) => {
      return todo !== text;
    });
    setTaskList(newList);
  };

  return (
    <div className="App">
      <h1>Todont</h1>
      <TodoInput task={task} setTask={setTask} addTask={addTask} />
      <div>
        <TodoList list={taskList} remove={deleteTask} />
      </div>
    </div>
  );
}

export default App;
