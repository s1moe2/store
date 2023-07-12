const express = require("express");
const router = express.Router();
const { orders, users } = require("../db");
const { rewardsPoints } = require("./rewardspoints");

router.put("/:id", (req, res) => {
  const orderIx = orders.findIndex((order) => order.id === parseInt(req.params.id));
  //order exists
  if (orderIx === -1) return res.status(404).json({ error: "order not found" });

  //body input
  const bodyStatus = req.body.status;

  const possibleStatus = ["created", "preparing", "shipped", "delivered"];

  if (!possibleStatus.includes(bodyStatus)) {
    return res.status(400).json({ error: "Invalid body" });
  }
  // Update the status
  const previousStatus = orders[orderIx].status;
  orders[orderIx].status = bodyStatus;

  res.status(200).json({ previousStatus, newStatus: orders[orderIx].status });
});

router.post("/", (req, res) => {
  const { userId, products } = req.body;

  const status = "placed"; // Assuming "placed" is a valid status

  const finalPrice = calculateTotalPrice(products);

  // criar o objeto order
  const order = {
    id: generateOrderId(),
    userId,
    products,
    price: finalPrice,
    dateTime: new Date(),
    status,
    rewardPoints: rewardsPoints(finalPrice),
  };

  orders.push(order);

  // update user reward pts

  const userIx = users.findIndex((u) => u.id === parseInt(order.userId));

  if (userIx === -1) return res.status(404).json({ error: "user not found" });

  const user = users[userIx];

  if (!user.rewardPoints) {
    users[userIx].rewardPoints = 0;
  }

  const userPoint = user.rewardPoints + order.rewardPoints;

  users[userIx].rewardPoints = userPoint;

  // enviar resposta
  res.status(200).json({ order, users });
});

// funcao calcular total produto
function calculateTotalPrice(products) {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  return totalPrice.toFixed(2);
}

// Gerar um id aleatorio
function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "";
  for (let i = 0; i < 10; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
}

module.exports = router;
