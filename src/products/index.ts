import express, { Request, Response } from "express";
import { products, orders } from "../db";
import { body, validationResult } from "express-validator";

interface TopProducts {
  id: number;
  name: string;
  count: number;
}

const router = express.Router();
export default router

const validation = [
  body("name").isString().exists().notEmpty(),
  body("category").isString().exists().notEmpty(),
  body("price").isNumeric().exists(),
  body("image").isString().exists().notEmpty(),
];

router.get("/", (req: Request, res: Response) => {
  const prods = products;
  if (req.query.cat) {
    prods.filter((p) => p.category === req.query.cat);
  }

  res.status(200).json(prods);
});

router.put("/:id", (req: Request, res: Response) => {
  const indexProduct = products.findIndex((product) => product.id === parseInt(req.params.id));

  if (indexProduct === -1) return res.status(404).json({ error: "product not found" });

  products[indexProduct].name = req.body.name;
  products[indexProduct].category = req.body.category;
  products[indexProduct].price = req.body.price;
  products[indexProduct].image = req.body.image;

  res.status(200).json(products[indexProduct]);
});

router.get("/:id", (req: Request, res: Response) => {
  const selectProducts = products.find((product) => product.id === parseInt(req.params.id));
  res.status(200).json(selectProducts);
});

router.get("/bestsellers", (req: Request, res: Response) => {
  const bestsellers: TopProducts[] = [];

  orders.forEach((order) => {
    order.products.forEach((product) => {
      const productIndex = bestsellers.findIndex((p) => {
        return p.id === product.id;
      });

      if (productIndex === -1) {
        bestsellers.push({ id: product.id, name: product.name, count: 1 });
      } else {
        bestsellers[productIndex].count += 1;
      }
    });
  });

  const topString = String(req.query["top"]);
  const top: number = parseInt(topString, 10);

  if (top <= 0 || isNaN(top)) {
    return res.status(400).json({ error: "invalid value" });
  }
  const topProducts = bestsellers.sort((a, b) => b.count - a.count).slice(0, top);

  return res.status(200).json(topProducts);
});

router.delete("/:id", (req: Request, res: Response) => {
  const productIx = products.findIndex((u) => u.id === parseInt(req.params.id));
  if (productIx === -1) {
    return res.status(404).json({ error: "product not found " });
  }

  products.splice(productIx, 1);
  res.status(200).json({ message: "Product removed successfully." });
});

router.post("/", validation, (req: Request, res: Response) => {
  const validationProduct = validationResult(req);
  if (!validationProduct.isEmpty()) {
    return res.status(400).json({ error: validationProduct.array() });
  }

  const product = req.body;

  const newProduct = {
    id: product.length + 1,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

module.exports = router;
