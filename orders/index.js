const express = require("express");
const { orders, products } = require("../db");
const app = express();

let orders = [];

app.use(express.json());

app.post("/", (req, res) => {
  const { userId, products } = req.body;

  // Gerar um unico ID
  const orderId = generateOrderId();

  const price = calculateTotalPrice(products);

  const dateTime = new Date();

  const status = "placed"; // Assuming "placed" is a valid status

  // criar o objeto order
  const order = {
    userId,
    products,
    price,
    dateTime,
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
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "";
  for (let i = 0; i < 10; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
}

// Start servidor
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app; // exportar app
