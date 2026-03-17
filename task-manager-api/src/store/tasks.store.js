/** @type {Array<{id:number,title:string,completed:boolean}>} */
const tasks = [];
let nextId = 1;

function listTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === id) ?? null;
}

function createTask({ title, completed }) {
  const task = {
    id: nextId++,
    title,
    completed: completed ?? false,
  };
  tasks.push(task);
  return task;
}

function updateTask(id, patch) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;

  const existing = tasks[idx];
  const updated = {
    ...existing,
    ...patch,
  };
  tasks[idx] = updated;
  return updated;
}

function deleteTask(id) {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return false;
  tasks.splice(idx, 1);
  return true;
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
