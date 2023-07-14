const express = require("express");
const router = express.Router();
const { products, orders } = require("../db");
const { body, validationResult } = require("express-validator");

const validation = [
  body("name").isString().exists().notEmpty(),
  body("category").isString().exists().notEmpty(),
  body("price").isNumeric().exists(),
  body("image").isString().exists().notEmpty(),
];

router.get("/", (req, res) => {
  const prods = products;
  if(req.query.cat) {
    prods.filter((p) => p.category === req.query.cat);
  }

  res.status(200).json(prods);
});

router.put("/:id", (req, res) => {

  const indexProduct = products.findIndex((product) => product.id === parseInt(req.params.id));

  if (indexProduct === -1) return res.status(404).json({ error: "product not found" });

  products[indexProduct].name = req.body.name;
  products[indexProduct].category = req.body.category;
  products[indexProduct].price = req.body.price;
  products[indexProduct].image = req.body.image;

  res.status(200).json(products[indexProduct]);

})

router.get("/:id", (req, res) => {
  const products = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  res.status(200).json(products);
});

router.get("/bestsellers", (req, res) => {
  const bestsellers = [];

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

  const { top } = req.query;

  if (top <= 0 || isNaN(top)) {
    return res.status(400).json({ error: "invalid value" });
  }
  const topProducts = bestsellers
    .sort((a, b) => b.count - a.count)
    .slice(0, top);

  return res.status(200).json(topProducts);
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
    name: products.name,
    category: products.category,
    price: products.price,
    image: products.image,
  };
  products.push(newProduct);

  res.status(201).json(newProduct);
});

module.exports = router;
