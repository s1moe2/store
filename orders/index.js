const express = require("express");
const router = express.Router();
const { orders } = require("../db");
const config = require("../config");

router.put("/:id", (req, res) => {
  const orderIx = orders.findIndex((order) => order.id === parseInt(req.params.id));
  //order exists
  if (orderIx === -1) return res.status(404).json({ error: "order not found" });

  //body input
  const bodyStatus = req.body.status;

  const orderStatuses = config.ORDER_STATUSES;

  if (!orderStatuses.includes(bodyStatus)) {
    return res.status(400).json({ error: "Invalid body" });
  }
  // Update the status
  const previousStatus = orders[orderIx].status;
  orders[orderIx].status = bodyStatus;
  console.log(orderStatuses);
  res.status(200).json({ previousStatus, newStatus: orders[orderIx].status });
});

router.post("/", (req, res) => {
  const { userId, products } = req.body;

  const status = "placed"; // Assuming "placed" is a valid status

  // criar o objeto order
  const order = {
    id: generateOrderId(),
    userId,
    products,
    price: calculateTotalPrice(products),
    dateTime: new Date(),
    status,
  };

  orders.push(order);

  // enviar resposta
  res.status(200).json(order);
});

// funcao calcular total produto
function calculateTotalPrice(products) {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  return totalPrice;
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
