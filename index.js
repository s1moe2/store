const express = require("express");
const app = express();
const { logger } = require("./middleware");
const products = require("./products")
const users = require ("./users")


app.use(logger);

app.use("/products", products);
app.use("/users", users);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "internal error" });
});

app.listen(3000, () => {
    console.log("engine started...");
});
