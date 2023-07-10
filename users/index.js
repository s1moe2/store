const express = require("express");
const router = express.Router();
const db = require("../db");

// get by id
router.get("/:id", (req, res) => {
  const user = db.users.find((u) => u.id === parseInt(req.params.id));
  console.log(user);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

router.put("/:id", (req, res) => {
  //find user by id
  const user = db.users.find((u) => u.id === parseInt(req.params.id));

  //user exists?

  const body = req.body;
  const name = body.name;
  const email = body.email;

  if (user) {
    //update
    user.name = name;
    user.email = email;
    console.log(user);
    
    //result
    res.status(200).json(user);
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
