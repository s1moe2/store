const { orders } = require("../db");

function findById(id) {
  return orders.findIndex((order) => order.id === id);
}

function displayStatus(orderId) {
  return orders[orderId].status;
}

function updateStatus(ix, newStatus) {
  orders[ix].status = newStatus
}

module.exports = {
  findById,
  displayStatus,
  updateStatus,
}  
