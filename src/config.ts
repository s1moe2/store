import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.API_PORT ?? 3000;
export const ORDER_STATUSES = process.env.ORDER_STATUSES ? process.env.ORDER_STATUSES.split(",") : [];
export const JWT_SECRET = process.env.JWT_SECRET ?? "";
