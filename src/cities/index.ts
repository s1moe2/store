import { City } from "./cities.model";
import { router } from "./cities.router";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/cities", (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

export { City, router };