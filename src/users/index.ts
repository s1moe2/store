import express from "express";
import * as db from "../db";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";

const router = express.Router();
export default router

const validation = [
  body("name").isString().notEmpty().exists(),
  body("email").isEmail().notEmpty().exists(),
];

router.get("/", (req: Request, res: Response) => {
  const users = db.users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
  res.status(200).json(users);
});

router.get("/:id", (req: Request, res: Response) => {
  const user = db.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "user not found" });
  res.status(200).json(user);
});

router.get("/:id/orders", (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const user = db.users.find((u) => u.id === userId);
  if (!user) return res.status(404).json({ error: "user not found" });

  const userOrders = db.orders.filter((order) => order.userID === userId);

  return res.status(200).json(userOrders);
});

router.put("/:id", validation, (req: Request, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ errors: validationRes.array() });
  }

  //find user by id
  const userIx = db.users.findIndex((u) => u.id === parseInt(req.params.id));

  //user exists?
  if (userIx === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  //update
  db.users[userIx].name = req.body.name;
  db.users[userIx].email = req.body.email;

  //result
  res.status(200).json(db.users[userIx]);
});
