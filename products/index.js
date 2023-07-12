const express = require("express");
const router = express.Router();
const { products } = require("../db");
const { body, validationResult } = require("express-validator");

const validation = [
  body("name").isString().exists().notEmpty(),
  body("category").isString().exists().notEmpty(),
  body("price").isNumeric().exists(),
  body("image").isString().exists().notEmpty(),
];

router.get("/", (req, res) => {
  const prods = prods
  if(req.query.cat) {
    prods.filter((p) => p.category === req.query.cat);
  }

  res.status(200).json(prods);
});

router.get("/:id", (req, res, next) => {
  try {
    const products = products.find(
      (product) => product.id === parseInt(req.params.id)
    );
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res) => {
  const productIx = products.findIndex((u) => u.id === parseInt(req.params.id));
  if (productIx === -1) {
    return res.status(404).json({ error: "product not found " });
  }

  products.splice(productIx, 1);
  res.status(200).json({ message: "Product removed successfully." });
});

router.post("/", validation, (req, res) => {
  const validationProduct = validationResult(req);
  if (!validationProduct.isEmpty()) {
    return res.status(400).json({ error: validationProduct.array() });
  }

  const newProduct = {
    id: products.length + 1,
    name: product.name,
    category: product.category,
    price: product.price,
    image: product.image,
  };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

module.exports = router;
