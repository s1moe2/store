import * as db from "../db";
import { Product } from "../models/product";
import { Order } from "./orders.model";


export const getByUserId = (userId: number) => db.orders
  .filter((u) => u.userId === userId);


export const create = (userId: number, products: Product[]) => {
  const finalPrice = calculateTotalPrice(products);
  const rewardPoints = calculateRewardPoints(finalPrice)
  
  const order: Order = {
    id: generateOrderId(),
    userId,
    products,
    price: finalPrice,
    orderedAt: new Date(),
    status: "placed",
    rewardPoints,
  }; 
  db.orders.push(order);

  return order
}


export const update = (id: string, newStatus: string) => {
  const orderIx = db.orders.findIndex((order) => order.id === id)

  if (orderIx === -1) {
    return undefined
  }

  const order = db.orders[orderIx];
  const previousStatus = order.status;
  order.status = newStatus;
  return {previousStatus, newStatus};
}


function calculateTotalPrice(products: Product[]): number {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice += products[i].price;
  }
  return totalPrice;
}


function generateOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let orderId = "";
  for (let i = 0; i < 10; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
}

export function calculateRewardPoints(price: number) {
  let points = 0;

  if (price > 100) {
    points = Math.round(price * 0.05);
  } else if (price > 1000) {
    points = Math.round(price * 0.1);
  }
  return points;
}
