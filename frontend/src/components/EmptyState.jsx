import React from "react";

const COPY = {
  all: {
    title: "Nothing on the list yet",
    body: "Add your first assignment above to start tracking it."
  },
  active: {
    title: "Nothing left to do",
    body: "Every task is checked off. Add a new one whenever you need."
  },
  completed: {
    title: "No completed tasks yet",
    body: "Check off a task and it'll show up here."
  }
};

export default function EmptyState({ filter }) {
  const { title, body } = COPY[filter] || COPY.all;

  return (
    <div className="empty-state">
      <svg viewBox="0 0 64 64" width="52" height="52" aria-hidden="true">
        <rect x="10" y="8" width="44" height="52" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M20 22h24M20 32h24M20 42h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__body">{body}</p>
    </div>
  );
}
