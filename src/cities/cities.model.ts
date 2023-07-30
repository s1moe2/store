import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
  name: String,
  mapUrl: String,
  airport: String,
  population: Number,
});

const City = mongoose.model("City", CitySchema);

export interface City {
  id: string;
  name: string;
  mapUrl: string;
  airport: string;
  population: number;
}
