const { createApp } = require("./src/app");

const PORT = Number(process.env.PORT) || 3000;

const app = createApp();

app.listen(PORT, () => {

  console.log(`Task Management API listening on port ${PORT}`);
});
