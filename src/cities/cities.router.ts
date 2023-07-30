import express from 'express';
import { Request, Response } from "express-serve-static-core";
import { body, param, validationResult } from "express-validator";
import { City } from "./cities.model";
import { create, update } from "./cities.service";

export const router = express.Router();

const validationPut = [
  param("id").isString().exists(),
  body("name").notEmpty().exists(),
];

type RequestPut = Request<{ id: string }, unknown, { id: string, name: string }>;

router.put("/:id", validationPut, (req: RequestPut, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const result = update(req.params.id, req.body.name);
  if (!result) {
    return res.status(404).json({ error: "city not found" });
  }

  res.status(200).json(result);
});

const validationPost = [
  body("name").notEmpty().exists(),
];
