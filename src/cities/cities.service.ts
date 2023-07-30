import CityModel, { City } from "./cities.model";

export const getAll = async () => {
  const cities = await CityModel.find();
  return cities;
};

export const create = async (name: string) => {
  const city: City = {
    id: generateCityId(),
    name,
    mapUrl: "",
    airport: "",
    population: 0,
  };
  const result = await CityModel.create(city);
  return result;
};

export const update = async (id: string, newName: string) => {
  const city = await CityModel.findById(id);
  if (!city) {
    return undefined;
  }

  city.name = newName;
  await city.save();
  return city;
};

export const getById = async (id: string) => {
  const city = await CityModel.findById(id);
  return city;
};

export const deleteById = async (id: string) => {
  const result = await CityModel.deleteOne({ _id: id });
  return result;
};

function generateCityId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let cityId = "";
  for (let i = 0; i < 10; i++) {
    cityId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return cityId;
}
