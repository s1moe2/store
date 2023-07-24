import express from "express";
import { findById, displayStatus, updateStatus } from "./findById";
import { param, body, validationResult } from "express-validator";
import { orders, users } from "../db";
import { rewardPoints } from "./reward-points";
import { Request, Response } from "express-serve-static-core";
import * as config from "../config";
import { Order } from "../models/order";

const router = express.Router();
export default router;

const validation = [
  param("id").isInt().exists(),
  body("status").notEmpty().exists().contains(["delivered"]),
];

router.put("/:id", validation, (req: Request, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(404).json({ error: validationRes.array() });
  }

  const orderIx = findById(req.params.id);
  //order exists
  if (orderIx === -1) {
    return res.status(404).json({ error: "Invalid Value" });
  }

  // Update the status
  const previousStatus = displayStatus(orderIx);
  updateStatus(orderIx, req.body.status);

  res.status(200).json({ previousStatus, newStatus: displayStatus(orderIx) });
});

router.post("/", (req: Request, res: Response) => {
  const { userId, products } = req.body;

  const status = "placed"; // Assuming "placed" is a valid status

  const userIx = users.findIndex((u) => u.id === parseInt(order.userId.toString()));
  if (userIx === -1) return res.status(404).json({ error: "user not found" });

  const finalPrice = calculateTotalPrice(products);

  // criar o objeto order
  const order: Order = {
    id: generateOrderId(),
    userId,
    products,
    price: finalPrice,
    orderedAt: new Date(),
    status,
    rewardPoints: rewardPoints(finalPrice),
  };

  orders.push(order);

  // update user reward pts
  const user = users[userIx];
  if (!user.rewardPoints) {
    users[userIx].rewardPoints = 0;
  }

  users[userIx].rewardPoints = user.rewardPoints + order.rewardPoints;

  // enviar resposta
  res.status(200).json({ order, users });
});

// funcao calcular total produto
function calculateTotalPrice(products: any): number {
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
