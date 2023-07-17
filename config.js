require("dotenv").config();

const PORT = process.env.API_PORT ?? 3000;

const ORDER_STATUSES = process.env.ORDER_STATUSES ? process.env.ORDER_STATUSES.split(",") : [];

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  ORDER_STATUSES,
  JWT_SECRET,
};
