import React from "react";

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Completed" }
];

export default function FilterTabs({ active, onChange, counts }) {
  return (
    <div className="filter-tabs" role="tablist" aria-label="Filter tasks">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className={`filter-tabs__tab${active === tab.key ? " is-active" : ""}`}
          onClick={() => onChange(tab.key)}
          type="button"
        >
          {tab.label}
          <span className="filter-tabs__count">{counts[tab.key]}</span>
        </button>
      ))}
    </div>
  );
}
