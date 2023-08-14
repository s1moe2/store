import { ObjectId } from "mongodb";
import { getDb } from "../db/mongo";
import { City } from "./cities.model";

export const getAll = async (): Promise<City[]> => {
  const db = await getDb();
  const cities = await db.collection<City>("cities").find().toArray();
  return cities;
};

export const create = async (name: string): Promise<City> => {
  const db = await getDb();
  const city: Omit<City, "_id"> = {
    name,
    mapUrl: "",
    airport: "",
    population: 0,
  };
  const result = await db.collection<City>("cities").insertOne(city as City);

  return { ...city, _id: result.insertedId };
};

export const update = async (id: string, newName: string): Promise<City | null> => {
  const db = await getDb();
  const result = await db
    .collection<City>("cities")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { name: newName } },
      { returnDocument: "after" },
    );
  return result.value || null;
};

export const getById = async (id: string): Promise<City | null> => {
  const db = await getDb();
  const city = await db.collection<City>("cities").findOne({ _id: new ObjectId(id) });
  return city || null;
};

export const deleteById = async (id: string): Promise<number> => {
  const db = await getDb();
  const result = await db.collection<City>("cities").deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount || 0;
};
