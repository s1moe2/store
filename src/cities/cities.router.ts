import express, { Response, Request } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";
import { create, update, getAll, getById, deleteById } from "./cities.service";

export const router = express.Router();

const validationCity = [body("name").notEmpty().exists()];

type RequestPost = Request<
  { id: string },
  unknown,
  { name: string; mapUrl: string; airport: string; population: number }
>;

//POST
router.post("/", validationCity, async (req: RequestPost, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  const city = await create(req.body.name);
  res.status(201).json(city);
});

type RequestPut = Request<
  { id: string },
  unknown,
  { name: string; mapUrl: string; airport: string; population: number }
>;

//PUT
router.put(
  "/:id",
  [param("id").isString().exists(), ...validationCity],
  async (req: RequestPut, res: Response) => {
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

//GET
router.get("/:id", async (req: Request, res: Response) => {
  const city = await getById(req.params.id);
  if (!city) {
    return res.status(404).json({ error: "city not found" });
  }

  res.status(200).json(city);
});

//DELETE
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await deleteById(req.params.id);
  if (!result) {
    return res.status(404).json({ error: "city not found" });
  }

  res.status(200).json({ message: "city deleted" });
});

export default router;
