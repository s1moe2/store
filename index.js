const express = require("express");
const app = express();
const { logger } = require("./middleware");
const users = require("./users");
const products = require("./products");
const orders = require("./orders");

app.use(express.json());
app.use(logger);

app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

app.listen(3000, () => {
  console.log("engine started...");
});
