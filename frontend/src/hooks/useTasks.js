import { useCallback, useEffect, useState } from "react";
import * as api from "../api/tasks.js";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
      setStatus("ready");
    } catch (err) {
      setError(err.message || "Couldn't reach the server.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addTask = useCallback(async (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    // Optimistic placeholder
    const tempId = `temp-${Date.now()}`;
    const optimisticTask = { _id: tempId, title: trimmed, completed: false, createdAt: new Date().toISOString() };
    setTasks((prev) => [...prev, optimisticTask]);

    try {
      const saved = await api.createTask(trimmed);
      setTasks((prev) => prev.map((t) => (t._id === tempId ? saved : t)));
    } catch (err) {
      setTasks((prev) => prev.filter((t) => t._id !== tempId));
      throw err;
    }
  }, []);

  const toggleComplete = useCallback(async (task) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, completed: !t.completed } : t))
    );
    try {
      const saved = await api.updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? saved : t)));
    } catch (err) {
      // revert on failure
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: task.completed } : t))
      );
      throw err;
    }
  }, []);

  const removeTask = useCallback(async (id) => {
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTask(id);
    } catch (err) {
      setTasks(previous);
      throw err;
    }
  }, [tasks]);

  return { tasks, status, error, reload: load, addTask, toggleComplete, removeTask };
}
