# Student Task Dashboard

## Objective

Complete the application using HTML, CSS, JavaScript, Node.js, Express, MongoDB, Git, GitHub, teamwork workflow, and responsive design.

## Requirements

- Add Task
- Delete Task
- Mark Task as Completed
- Display Total Tasks
- Display Completed Tasks
- Display Remaining Tasks

## Git Instructions

1. Clone this repository.

2. Create a new branch:

```bash
git checkout -b feature-yourname
```

3. Commit your work regularly.

4. Pull the latest changes.

5. Resolve any merge conflicts.

6. Push your branch.

7. Create a Pull Request.

## Tech Stack

- Frontend: React 18 (Vite), plain CSS design system
- Backend: Node.js, Express
- Database: MongoDB (via Mongoose)

## Project Structure

```
student-task-dashboard/
├── backend/
│   ├── models/
│   │   └── Task.js              # Mongoose schema
│   └── routes/
│       └── tasks.js             # CRUD API routes
├── frontend/                     # React (Vite) app
│   ├── index.html
│   ├── vite.config.js            # dev proxy: /api -> localhost:3000
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css               # design system + component styles
│       ├── index.css             # global tokens
│       ├── api/tasks.js          # fetch wrappers for the API
│       ├── hooks/useTasks.js     # task state + optimistic updates
│       └── components/
│           ├── Header.jsx
│           ├── StatsPanel.jsx    # animated completion ring
│           ├── AddTaskBar.jsx
│           ├── FilterTabs.jsx
│           ├── TaskList.jsx
│           ├── TaskItem.jsx
│           ├── EmptyState.jsx
│           └── Toast.jsx
├── server.js                     # Express app entry point, serves frontend/dist
├── package.json
└── .env.example
```

## Setup & Run

1. Install backend dependencies:

```bash
npm install
```

2. Install and build the React frontend (creates `frontend/dist`):

```bash
npm run build
```

3. Make sure MongoDB is running locally (or update `MONGO_URI` to point to Atlas/another instance).

4. Copy `.env.example` to `.env` and adjust values if needed:

```bash
cp .env.example .env
```

5. Start the server:

```bash
npm start
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser — Express serves the built React app and the `/api/tasks` routes.

### Frontend-only development (hot reload)

While the Express server is running on port 3000, you can run the React dev server separately for instant hot reload; it proxies `/api` calls to Express automatically:

```bash
npm run frontend:dev
```

Then open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

## API Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|----------------------------|
| GET    | `/api/tasks`      | Get all tasks              |
| POST   | `/api/tasks`      | Create a task (`{title}`)  |
| PATCH  | `/api/tasks/:id`  | Update a task (e.g. `{completed: true}`) |
| DELETE | `/api/tasks/:id`  | Delete a task              |

## Submission
