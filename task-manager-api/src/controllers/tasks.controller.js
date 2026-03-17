const tasksStore = require("../store/tasks.store");

function parseId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function createTask(req, res) {
  const { title, completed } = req.body ?? {};

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "`title` is required and must be a non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "`completed` must be a boolean when provided" });
  }

  const task = tasksStore.createTask({ title: title.trim(), completed });
  return res.status(201).json(task);
}

function getAllTasks(_req, res) {
  return res.json(tasksStore.listTasks());
}

function getTaskById(req, res) {
  const id = parseId(req);
  if (id === null) return res.status(400).json({ error: "`id` must be a positive integer" });

  const task = tasksStore.getTaskById(id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  return res.json(task);
}

function updateTask(req, res) {
  const id = parseId(req);
  if (id === null) return res.status(400).json({ error: "`id` must be a positive integer" });

  const { title, completed } = req.body ?? {};

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res.status(400).json({ error: "`title` must be a non-empty string when provided" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ error: "`completed` must be a boolean when provided" });
  }

  const updated = tasksStore.updateTask(id, {
    ...(title !== undefined ? { title: title.trim() } : {}),
    ...(completed !== undefined ? { completed } : {}),
  });

  if (!updated) return res.status(404).json({ error: "Task not found" });
  return res.json(updated);
}

function deleteTask(req, res) {
  const id = parseId(req);
  if (id === null) return res.status(400).json({ error: "`id` must be a positive integer" });

  const ok = tasksStore.deleteTask(id);
  if (!ok) return res.status(404).json({ error: "Task not found" });

  return res.status(204).send();
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
