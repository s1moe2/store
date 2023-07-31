import express from "express";
import { router } from "./cities.router";
import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/cities";

async function main() {
  try {
    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB");
    const app = express();
    module.exports = app;
    app.use(express.json());
    app.use("/cities", router);

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

export default main;
