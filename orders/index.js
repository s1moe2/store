const express = require("express");
const router = express.Router();
const { orders } = require("../db");

router.put("/:id", (req, res) => {
  const orderIx = orders.findIndex(
    (order) => order.id === parseInt(req.params.id)
  );
  //order exists
  if (orderIx === -1) return res.status(404).json({ error: "order not found" });

  //body input
  bodyStatus = req.body.status;
  
  const possibleStatus = ["created", "preparing", "shipped", "delivered"];
  
  if (!possibleStatus.includes(bodyStatus)) {
      return res.status(400).json({ error: "Invalid body" });
    }
// Update the status
const previousStatus = orders[orderIx].status;
orders[orderIx].status = bodyStatus;

res.status(200).json({ previousStatus, newStatus: orders[orderIx].status });
});

module.exports = router;

