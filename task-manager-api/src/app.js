const express = require("express");
const tasksRoutes = require("./routes/tasks.routes");

function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({
      message: "Task Management API is running",
      endpoints: ["POST /tasks", "GET /tasks", "GET /tasks/:id", "PUT /tasks/:id", "DELETE /tasks/:id"],
    });
  });

  app.use("/tasks", tasksRoutes);

  return app;
}

module.exports = { createApp };
