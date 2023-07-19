import express, { NextFunction, Request, Response } from "express";
import { logger, auth } from "./middleware";
import users from "./users";
import products from "./products";
import orders from "./orders";
import authRoutes from "./auth";
import * as config from "./config";
const app = express();

app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes);

// app.use(auth);

app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

app.listen(config.PORT, () => {
  console.log("running on port ", config.PORT);
});
