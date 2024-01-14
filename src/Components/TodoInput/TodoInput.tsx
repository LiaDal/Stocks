import React from "react";
function TodoInput({ task, setTask, addTask }) {
  return (
    <div>
      <input
        type="text"
        value={task}
        name="todo"
        placeholder="Create a new task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

export default TodoInput;
