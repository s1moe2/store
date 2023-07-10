const express = require("express");
const app = express();
const { logger } = require("./middleware");
const users = require("./users");
const products = require("./products");

app.use(express.json());
app.use(logger);

app.use("/users", users);
app.use("/products", products);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

app.listen(3000, () => {
  console.log("engine started...");
});
