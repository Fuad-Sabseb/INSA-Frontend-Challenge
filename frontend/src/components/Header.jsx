import React from "react";

const today = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric"
});

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <span className="app-header__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
              <rect x="3" y="4" width="26" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M9 4v-1M23 4v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 12h18M7 17h13M7 22h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="app-header__eyebrow">Coursework Tracker</p>
            <h1 className="app-header__title">Student Task Dashboard</h1>
          </div>
        </div>
        <p className="app-header__date">{today}</p>
      </div>
    </header>
  );
}
