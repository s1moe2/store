const express = require("express");
const router = express.Router();
const { products } = require("../db");

router.get("/", (req, res) => {
  res.status(200).json(products);
});

router.get("/:id", (req, res, next) => {
  try {
    const products = products.find((product) => product.id === parseInt(req.params.id));
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
  res.status(200).json({ message: 'Product removed successfully.' });
});

router.post("/", (req, res) => {
  const product = req.body;
  if (!product.name || !product.category || !product.price || !product.image) {
    return res.status(400).json({ error: "Invalid product" });
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
