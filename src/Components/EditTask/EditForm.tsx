import React, { useState } from "react";
import Form from "../Form/FormStyle.tsx";
import Button from "../Button/Button.ts";
import EditFormStyle from "./EditFormStyle.ts";

function EditForm({ task, saveTask, cancelEdit }) {
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

export default EditForm;
