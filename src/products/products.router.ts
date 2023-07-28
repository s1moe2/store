import express, { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { products } from "../db";
import { getAll, getById, getBestsellers, create, update, remove} from "./products.service";

export const router = express.Router();


router.get("/", (req: Request, res: Response) => {
  const result = getAll(req.query.cat as string);
  res.status(200).json(result);
});


router.get("/bestsellers", (req: Request, res: Response) => {
  // ATTENTION: this must be before the route that handles "/:id"

  let top = parseInt(req.query["top"] as string, 10);
  if(top <= 0 || isNaN(top)) top = 3;

  const products = getBestsellers(top)
  return res.status(200).json(products);
});


router.get("/:id", (req: Request, res: Response) => {
  const product = getById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }

  res.status(200).json(product);
});


const validationPost = [
  body("name").isString().exists().notEmpty(),
  body("category").isString().exists().notEmpty(),
  body("price").isNumeric().exists(),
  body("image").isString().exists().notEmpty(),
];
type RequestPost = Request<{}, unknown, {name: string, category: string, price: number, image: string}>;

router.post("/", validationPost, (req: RequestPost, res: Response) => {
  const validationProduct = validationResult(req);
  if (!validationProduct.isEmpty()) {
    return res.status(400).json({ error: validationProduct.array() });
  }

  const {name, category, price, image} = req.body
  const newProduct = create(name, category, price, image)

  res.status(201).json(newProduct);
});


const validationPut = [
  param("id").isString().exists(),
  body("name").isString().exists().notEmpty(),
  body("category").isString().exists().notEmpty(),
  body("price").isNumeric().exists(),
  body("image").isString().exists().notEmpty(),
];
type RequestPut = Request<{id: string}, unknown, {name: string, category: string, price: number, image: string}>;

router.put("/:id", validationPut, (req: RequestPut, res: Response) => {
  const validationProduct = validationResult(req);
  if (!validationProduct.isEmpty()) {
    return res.status(400).json({ error: validationProduct.array() });
  }

  const {id} = req.params;
  const {name, category, price, image} = req.body;

  const product = update(id, name, category, price, image);
  if (!product) {
    return res.status(404).json({ error: "product not found" });
  }

  res.status(200).json(product);
});


router.delete("/:id", (req: Request, res: Response) => {
  const product = getById(req.params.id)
  if (!product) return res.status(404).json({ error: "product not found" });
  remove(req.params.id)
  res.status(204).json();
});

