const express = require("express");
const app = express();
const { logger } = require("./middleware");
const users = require("./users/index.js");
const db = require("./db/index.js");

app.use(logger);

app.use("/users", users);

app.listen(3000, () => {
  console.log("engine started...");
});
