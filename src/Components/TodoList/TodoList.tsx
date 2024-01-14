import React from "react";function TodoList({ list, remove }) {
  return (
    <>
      <h2>{list.lenth} task remaining</h2>
      {list?.length > 0 ? (
        <ul className="todo-list">
          {list.map((entry, index) => (
            <div className="task-item">
              <li key={index}>{entry}</li>
              <button
                onClick={() => {
                  remove(entry);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </>
  );
}

export default TodoList;
