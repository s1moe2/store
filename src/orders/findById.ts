import { orders } from "../db";

export function findById(id: string) {
  return orders.findIndex((order: Order) => order.id === id);
}

export function displayStatus(orderId: number) {
  return orders[orderId].status;
}

export function updateStatus(ix: number, newStatus: string) {
  orders[ix].status = newStatus;
}
