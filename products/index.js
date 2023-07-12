const express = require("express");
const router = express.Router();
const { products } = require("../db");
const { orders } = require("../db");

// router.get("/", (req, res) => {
//   const prd = products.filter((p) => p.category === req.query.cat);

//   res.status(200).json(prd);
// });

// router.get("/:id", (req, res, next) => {
//   try {
//     const prd = products.find(
//       (product) => product.id === parseInt(req.params.id)
//     );
//     res.status(200).json(prd);
//   } catch (err) {
//     next(err);
//   }
// });

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
