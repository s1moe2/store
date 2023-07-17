const express = require("express");
const app = express();
const { logger, auth } = require("./middleware");
const users = require("./users");
const products = require("./products");
const orders = require("./orders");
const authRoutes = require("./auth");
const config = require("./config");

app.use(express.json());
app.use(logger);

app.use("/auth", authRoutes);

// app.use(auth);

app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);

/* eslint-disable no-unused-vars*/
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "internal error" });
});

app.listen(config.PORT, () => {
  console.log("running on port ", config.PORT);
});
