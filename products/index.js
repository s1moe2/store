const express = require("express");
const router = express.Router();
const db = require("../db");

router.delete("/:id", (req, res) => {
  const productIx = db.products.findIndex((u) => u.id === parseInt(req.params.id));
  if (productIx === -1) {
    return res.status(404).json({ error: "product not found " });
  }

  db.products.splice(productIx, 1);
  res.status(200).json({ message: 'Product removed successfully.' });
});

module.exports = router;
