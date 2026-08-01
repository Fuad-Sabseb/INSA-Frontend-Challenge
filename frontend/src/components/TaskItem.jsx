import React, { useState } from "react";

export default function TaskItem({ task, onToggle, onDelete }) {
  const [leaving, setLeaving] = useState(false);
  const [toggling, setToggling] = useState(false);

  async function handleToggle() {
    if (toggling) return;
    setToggling(true);
    try {
      await onToggle(task);
    } finally {
      setToggling(false);
    }
  }

  function handleDelete() {
    setLeaving(true);
    window.setTimeout(() => onDelete(task._id), 220);
  }

  return (
    <li
      className={`task-card${task.completed ? " is-complete" : ""}${leaving ? " is-leaving" : ""}`}
    >
      <button
        type="button"
        className="task-card__check"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={task.completed ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
        onClick={handleToggle}
      >
        <svg viewBox="0 0 20 20" width="16" height="16">
          <path
            d="M4 10.5l3.5 3.5L16 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <span className="task-card__title">{task.title}</span>

      <button
        type="button"
        className="task-card__delete"
        onClick={handleDelete}
        aria-label={`Delete "${task.title}"`}
      >
        <svg viewBox="0 0 20 20" width="15" height="15">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}
