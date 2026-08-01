require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const taskRoutes = require("./backend/routes/tasks");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student-task-dashboard";

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/tasks", taskRoutes);

// Serve the built React frontend (run `npm run build` inside /frontend first)
const frontendDist = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDist));

// Let the React app handle any non-API route (client-side routing safe fallback)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

// Connect to MongoDB, then start the server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    });
