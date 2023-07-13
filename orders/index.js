const express = require("express");
const router = express.Router();
const { findById, displayStatus, updateStatus } = require("./findById");
const { param, body, validationResult } = require("express-validator");

const validation = [
  param("id").isInt().exists(),
  body("status").notEmpty().exists().contains(["created", "preparing", "shipped", "delivered"]),
];

router.put("/:id", validation, (req, res) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(404).json({ error: validationRes.array() });
  }

  const orderIx = findById(parseInt(req.params.id));
  //order exists
  if (orderIx === -1) {
    return res.status(404).json({ error: "Invalid Value" });
  }

  // Update the status
  const previousStatus = displayStatus(orderIx);
  updateStatus(orderIx, req.body.status);

  res.status(200).json({ previousStatus, newStatus: displayStatus(orderIx) });
});

module.exports = router;
