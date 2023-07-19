const { orders } = require("../db");

export function findById(id: String) {
  return orders.findIndex((order: Order) => order.id === id);
}

export function displayStatus(orderId: number) {
  return orders[orderId].status;
}

export function updateStatus(ix: number, newStatus: String) {
  orders[ix].status = newStatus;
}
