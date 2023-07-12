const express = require("express");
const router = express.Router();
const { users } = require("../db");

router.get("/", (req, res) => {
  const users = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

router.put("/:id", (req, res) => {
  //find user by id
  const userIx = users.findIndex((u) => u.id === parseInt(req.params.id));

  //user exists?
  if (userIx === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  //update
  users[userIx].name = req.body.name;
  users[userIx].email = req.body.email;

  //result
  res.status(200).json(users[userIx]);
});

module.exports = router;
