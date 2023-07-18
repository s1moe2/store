const express = require("express");
const router = express.Router();
const { users, orders } = require("../db");

const { body, validationResult } = require("express-validator");

const validation = [
  body("name").isString().notEmpty().exists(),
  body("email").isEmail().notEmpty().exists(),
];

router.get("/", (req, res) => {
  const u = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
  res.status(200).json(u);
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

router.get("/:id/orders", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "user not found" });

  const userOrders = orders.filter((order) => order.userID === userId);

  return res.status(200).json(userOrders);
});

router.put("/:id", validation, (req, res) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ errors: validationRes.array() });
  }

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
