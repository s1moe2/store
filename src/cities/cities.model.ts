import mongoose from "mongoose";

export interface City {
  id: string;
  name: string;
  mapUrl: string;
  airport: string;
  population: number;
}

const CitySchema = new mongoose.Schema({
  name: String,
  mapUrl: String,
  airport: String,
  population: Number,
});

const City = mongoose.model("City", CitySchema);

export default City;
