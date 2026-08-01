const API_URL = "/api/tasks";

async function handle(res) {
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      /* ignore body parse errors */
    }
    throw new Error(message);
  }
  return res.json();
}

export function fetchTasks() {
  return fetch(API_URL).then(handle);
}

export function createTask(title) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  }).then(handle);
}

export function updateTask(id, updates) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  }).then(handle);
}

export function deleteTask(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(handle);
}
