import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import StatsPanel from "./components/StatsPanel.jsx";
import AddTaskBar from "./components/AddTaskBar.jsx";
import FilterTabs from "./components/FilterTabs.jsx";
import TaskList from "./components/TaskList.jsx";
import Toast from "./components/Toast.jsx";
import { useTasks } from "./hooks/useTasks.js";
import "./App.css";

export default function App() {
  const { tasks, status, error, reload, addTask, toggleComplete, removeTask } = useTasks();
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length
    }),
    [tasks]
  );

  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  async function handleAdd(title) {
    try {
      await addTask(title);
      setToast({ message: "Task added.", type: "success" });
    } catch {
      setToast({ message: "Couldn't add that task. Try again.", type: "error" });
    }
  }

  async function handleToggle(task) {
    try {
      await toggleComplete(task);
    } catch {
      setToast({ message: "Couldn't update that task.", type: "error" });
    }
  }

  async function handleDelete(id) {
    try {
      await removeTask(id);
      setToast({ message: "Task deleted.", type: "info" });
    } catch {
      setToast({ message: "Couldn't delete that task.", type: "error" });
    }
  }

  return (
    <>
      <Header />

      <main className="container">
        <StatsPanel total={counts.all} completed={counts.completed} remaining={counts.active} />

        <section className="panel">
          <AddTaskBar onAdd={handleAdd} disabled={status === "loading" && tasks.length === 0} />

          <FilterTabs active={filter} onChange={setFilter} counts={counts} />

          {status === "loading" && tasks.length === 0 && (
            <ul className="task-list" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <li key={i} className="task-card task-card--skeleton" />
              ))}
            </ul>
          )}

          {status === "error" && (
            <div className="error-banner">
              <p>{error || "Something went wrong loading your tasks."}</p>
              <button type="button" onClick={reload}>
                Try again
              </button>
            </div>
          )}

          {(status === "ready" || (status === "loading" && tasks.length > 0)) && (
            <TaskList
              tasks={visibleTasks}
              filter={filter}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Built for students who'd rather study than remember what to study.</p>
      </footer>

      <Toast toast={toast} />
    </>
  );
}
