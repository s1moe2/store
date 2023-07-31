import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { getAll, getById, create, update, remove } from "./animals.service";

export const router = express.Router();

router.get("/", async (_req: Request, res: Response) => {
  const animals = await getAll();
  res.status(200).json(animals);
});


router.get("/:id", async (req: Request, res: Response) => {
  const animal = await getById(req.params.id);

  if (!animal) {
    return res.status(404).json({ error: "animal not found" });
  }
  res.status(200).json(animal);
});


const validationPost = [
  body("name").notEmpty().exists(),
  body("specie").notEmpty().exists(), 
  body("height").notEmpty().exists(), // in cm 
  body("weight").notEmpty().exists(), // in kg
];
type RequestPost = Request<
  { id: string },
  unknown,
  { name: string; specie: string; height: number; weight: number }
>;
router.post("/", validationPost, async (req: RequestPost, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  try {
    const result = await create(req.body.name, req.body.specie, req.body.height, req.body.weight);
    return res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof RangeError) {
      return res.status(409).json({ error });
    }
  }
});


const validationPut = [
  body("name").notEmpty().exists(),
  body("specie").notEmpty().exists(),
  body("height").notEmpty().exists(), // in cm 
  body("weight").notEmpty().exists(), // in kg
];
type RequestPut = Request<
  { id: string },
  unknown,
  { name: string; specie: string; height: number; weight: number }
>;
router.put("/:id", validationPut, async (req: RequestPut, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ errors: validationRes.array() });
  }

  const result = await update(
    req.params.id,
    req.body.name,
    req.body.specie,
    req.body.height,
    req.body.weight,
  );
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "animal not found" });
  }

  res.status(200).json(result);
});


router.delete("/:id", async (req: Request, res: Response) => {
  const result = await remove(req.params.id)

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "animal not found" });
  }

  res.status(204).json();
});
