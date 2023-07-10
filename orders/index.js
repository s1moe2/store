const express = require("express");
const router = express.Router();
const { orders } = require("../db");

router.put("/:id", (req, res) => {
  const orderIx = orders.findIndex(
    (order) => order.id === parseInt(req.params.id)
  );
  //order exists
  if (orderIx === -1) return res.status(404).json({ error: "order not found" });

  //order update
  orders[orderIx].status = req.body.status;

  const possibleStatus = ["created", "preparing", "shipped", "delivered"];
  if (!possibleStatus.includes(orders[orderIx].status)) {
    return res.status(400).json({ error: "Invalid body" });
  }
  //result
  res.status(200).json(orders);
});

module.exports = router;

// created, preparing, shipped, delivered
