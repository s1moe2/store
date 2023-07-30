import * as db from "../db";
import { City } from "./cities.model";

export const getAll = () => db.cities;

export const create = async (name: string) => {
  const city: City = {
    id: generateCityId(),
    name,
    mapUrl: "",
    airport: "",
    population: 0,
  };
  const result = await City.create(city);
  return result;
};

export const update = async (id: string, newName: string) => {
  const city = await City.findById(id);
  if (!city) {
    return undefined;
  }

  city.name = newName;
  await city.save();
  return city;
};

function generateCityId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let cityId = "";
  for (let i = 0; i < 10; i++) {
    cityId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return cityId;
}