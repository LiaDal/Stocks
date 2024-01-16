import React from "react";
import Item from "./TodoItemStyle.tsx";
import Button from "../Button/Button.ts";
import Checkbox from "../Form/Checkbox.tsx";

type TodoItemProps = {
  task: {
    id: string;
    text: string;
    completed: boolean;
    isEditing: boolean;
  };
  deleteTask: (prop: string) => void;
  toggleCompleted: (prop: string) => void;
  editTask: (prop: string) => void;
};

function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  editTask,
}: TodoItemProps) {
  function handleChange() {
    toggleCompleted(task.id);
  }

  return (
    <>
      <Item>
        <Checkbox
          type="checkbox"
          checked={task.completed}
          onChange={handleChange}
        />
        <p>{task.text}</p>
      </Item>
      <Item>
        <Button onClick={() => editTask(task.id)}>Edit</Button>
        <Button onClick={() => deleteTask(task.id)}>Delete</Button>
      </Item>
    </>
  );
}
export default TodoItem;
