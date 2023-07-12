const express = require("express");
const app = express();
const { logger } = require("./middleware");

app.use(logger);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/users", (req, res) => {
  const userList = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  res.json(userList);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
