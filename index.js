const express = require("express");
const app = express();
const { logger } = require("./middleware");
const users = require("./users/index.js");
const db = require("./db/index.js");

app.use(logger);

// app.use("/users", users);

app.get("/users", (req, res) => {
  const users = db.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
  res.json(users);
  console.log(users);
});

// const userList = db.users.map((user) => ({
//   id: user.id,
//   name: user.name,
//   email: user.email,
// }));
// res.json(userList);
// console.log(userList);

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: "internal error" });
// });

app.listen(3000, () => {
  console.log("engine started...");
});
