import express from "express";
import { Request, Response } from "express-serve-static-core";
import { body, param, validationResult } from "express-validator";
import { orders, users } from "../db";
import { Order } from "../models/order";
import { displayStatus, findById, updateStatus } from "./findById";
import { rewardPoints } from "./reward-points";
import { Product } from "../models/product";

const router = express.Router();
export default router;

const validationGetById = [
  param("id").isInt().exists(),
  body("status").notEmpty().exists().contains(["delivered"]),
];
type RequestGetById = Request<{id: string}, unknown, {id: string, status: string}>;

router.put("/:id", validationGetById, (req: RequestGetById, res: Response) => {
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

const validationPost = [
  param("userId").isInt().exists(),
  body("products").isArray(),
];
type RequestPost = Request<{}, unknown, {userId: number, products: Product[]}>;

router.post("/", validationPost, (req: RequestPost, res: Response) => {
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
function calculateTotalPrice(products: Product[]): number {
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
