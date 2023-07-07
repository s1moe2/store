const express = require("express");
const router = express.Router();
const { products } = require("../db");

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
