import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import {
  createVegetable,
  getAll,
  getByVegetableName,
  removeVegetable,
  updateVegetable,
} from "./vegetables.service";
import { option, options } from "yargs";

export const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const vegetables = await getAll();
  res.status(200).json(vegetables);
});

router.get("/:id", async (req: Request, res: Response) => {
  const vegetable = await getByVegetableName(req.params.id);

  if (!vegetable) {
    return res.status(404).json({ error: "user not found" });
  }
  res.status(200).json(vegetable);
});

const validationPost = [
  body("name").notEmpty().exists(),
  body("color").notEmpty().exists(),
  body("price").isNumeric(), //missing the verification of > 0
];
type RequestPost = Request<{ id: string }, unknown, { name: string; color: string; price: number }>;

router.post("/", validationPost, async (req: RequestPost, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  try {
    const result = await createVegetable(req.body.name, req.body.color, req.body.price);
    return res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof RangeError) {
      return res.status(409).json({ error });
    }
  }
});

const validationPut = [
  body("name").notEmpty().exists(),
  body("color").notEmpty().exists(),
  body("price").isNumeric().isFloat({ gt: 0 }),
];
type RequestPut = Request<{ id: string }, unknown, { name: string; color: string; price: number }>;

router.put("/:id", validationPut, async (req: RequestPut, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ errors: validationRes.array() });
  }

  const result = await updateVegetable(
    req.params.id,
    req.body.name,
    req.body.color,
    req.body.price,
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "user not found" });
  }

  res.status(200).json(result);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await removeVegetable(req.params.id);

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "user not found" });
  }

  res.status(204).json();
});
