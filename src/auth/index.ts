import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import db from "../db";
import * as config from "../config";
import { body, validationResult } from "express-validator";

const router = express.Router();
export default router;

const signinValidation = [
  body("username").notEmpty().exists(),
  body("password").notEmpty().exists(),
];
type RequestSignin = Request<{}, unknown, {username: string, password: string}>;


router.post("/signin", signinValidation, async (req: RequestSignin, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const user = db.users.find((u) => u.username === req.body.username);
  if (!user) return res.status(401).json({ error: "unauthorized" });

  const isValid = await bcrypt.compare(req.body.password, user.password ?? "");
  if (!isValid) return res.status(401).json({ error: "unauthorized" });

  const token = jwt.sign({ userId: user.id }, config.JWT_SECRET);

  res.status(200).json({ token });
});
