import React, { useState, memo } from "react";import Form from "../Form/FormStyle.tsx";
import Button from "../Button/Button.ts";
import EditFormStyle from "./EditFormStyle.ts";

type EditFormProps = {
  task: {
    id: string;
    text: string;
    completed: boolean;
    isEditing: boolean;
  };
  saveTask: (value: string, id: string) => void;
  cancelEdit: (prop: string) => void;
};

const EditForm: React.FC<EditFormProps> = memo(
  ({ task, saveTask, cancelEdit }) => {
    const [value, setValue] = useState(task.text);

    function handleChange(e) {
      e.preventDefault();
      setValue(e.target.value);
    }

    return (
      <EditFormStyle>
        <Form value={value} placeholder="Update task" onChange={handleChange} />
        <Button onClick={() => saveTask(value, task.id)}>Save</Button>
        <Button onClick={() => cancelEdit(task.id)}>Cancel</Button>
      </EditFormStyle>
    );
  }
);

export default EditForm;
