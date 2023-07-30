import express from "express";
import { Request, Response } from "express-serve-static-core";
import { body, param, validationResult } from "express-validator";
import { create, update, getAll, getById, deleteById } from "./cities.service";

export const router = express.Router();

router.post("/", [body("name").notEmpty().exists()], async (req: Request, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const city = await create(req.body.name);
  res.status(201).json(city);
});

router.put(
  "/:id",
  [param("id").isString().exists(), body("name").notEmpty().exists()],
  async (req: Request, res: Response) => {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      return res.status(400).json({ error: validationRes.array() });
    }

    const result = await update(req.params.id, req.body.name);
    if (!result) {
      return res.status(404).json({ error: "city not found" });
    }

    res.status(200).json(result);
  },
);

router.get("/", async (req: Request, res: Response) => {
  const cities = await getAll();
  res.status(200).json(cities);
});

router.get("/:id", async (req: Request, res: Response) => {
  const city = await getById(req.params.id);
  if (!city) {
    return res.status(404).json({ error: "city not found" });
  }

  res.status(200).json(city);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const result = await deleteById(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "city not found" });
  }

  res.status(200).json({ message: "city deleted" });
});

export default router;
