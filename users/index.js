const express = require("express");
const router = express.Router();
const db = require("../db");

// get by id
router.get("/:id", (req, res) => {
  const user = db.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

module.exports = router;
