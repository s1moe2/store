import { router } from "./cities.router";
import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect("mongodb://localhost:27017/cities", (err: any) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to MongoDB");
  }
});

export { router };
