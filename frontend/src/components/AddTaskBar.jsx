import React, { useState } from "react";

export default function AddTaskBar({ onAdd, disabled }) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || submitting) return;

    setSubmitting(true);
    try {
      await onAdd(trimmed);
      setValue("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="add-bar" onSubmit={handleSubmit}>
      <label htmlFor="taskInput" className="sr-only">
        New task
      </label>
      <input
        id="taskInput"
        className="add-bar__input"
        type="text"
        placeholder="Read chapter 4, finish problem set 3, email professor…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        autoComplete="off"
      />
      <button
        type="submit"
        className="add-bar__button"
        disabled={disabled || !value.trim() || submitting}
      >
        {submitting ? "Adding…" : "Add task"}
      </button>
    </form>
  );
}
