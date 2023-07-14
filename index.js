const express = require("express");
const app = express();
const { logger } = require("./middleware");
const users = require("./users");
const products = require("./products");
const orders = require("./orders");
const config = require("./config");

app.use(express.json());
app.use(logger);

app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

app.listen(config.PORT, () => {
  console.log("running on port ", config.PORT);
});
