const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { users } = require("../db");
const config = require("../config");

const signupValidation = [
  body("username").notEmpty().exists(),
  body("email").notEmpty().isEmail().exists(),
  body("name").notEmpty().exists(),
  body("password").notEmpty().exists().isLength({ min: 3 }),
];

router.post("/signup", signupValidation, async (req, res) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const user = users.find((u) => u.username === req.body.username);
  if (user) return res.status(400).json({ error: "user already exists" });

  const hash = await bcrypt.hash(req.body.password, 12);

  const newUser = {
    id: users.length + 1,
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    spent: 0,
    password: hash,
  };

  users.push(newUser);

  res.status(200).json();
});

const signinValidation = [
  body("username").notEmpty().exists(),
  body("password").notEmpty().exists(),
];

router.post("/signin", signinValidation, async (req, res) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const user = users.find((u) => u.username === req.body.username);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).json({ error: "unauthorized" });

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET);

  res.status(200).json({ token });
});

module.exports = router;
