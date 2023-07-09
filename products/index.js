const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res, next) => {
    try {
        const products = db.products;
        res.json(products);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", (req, res, next) => {
    try {
        const products = db.products.find((product) => product.id === parseInt(req.params.id));
        res.json(products);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
