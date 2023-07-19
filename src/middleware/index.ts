import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import {Secret} from "jsonwebtoken";
import pino from "pino-http";
import { JWT_SECRET } from "../config";
function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "unauthorized" });
  try {
    jwt.verify(token.split(" ")[1], JWT_SECRET as Secret);
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
  next();
}
export let logger = {
  logger: pino(),
  auth,
};
