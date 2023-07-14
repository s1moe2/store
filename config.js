require('dotenv').config()

const PORT = process.env.API_PORT;

const ORDER_STATUSES = process.env.ORDER_STATUSES ? process.env.ORDER_STATUSES.split(",") : [];

module.exports = { PORT, ORDER_STATUSES };
