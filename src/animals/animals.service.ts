import { ObjectId } from "mongodb";
import { Animals } from "../animals";
import { getDb } from "../db/mongo";


export const getAll = async () => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const query = {};
  const result = await collection.find<Animals>(query).limit(50).toArray();

  return result;
};

export const getById = async (id: string) => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const query = { _id: new ObjectId(id) };
  const result = await collection.findOne<Animals>(query);

  return result;
};

export const getByName = async (name: string) => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const query = { name };
  const result = await collection.findOne<Animals>(query);

  return result;
};

export const create = async (name: string, specie: string, height: number, weight: number) => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const animal = await getByName(name);
  if (animal) {
    throw new RangeError("name already exists");
  }

  const newAnimal: Animals = {
    name,
    specie,
    height,
    weight,
  };

  return await collection.insertOne(newAnimal);
};

export const update = async (
  id: string,
  name: string,
  specie: string,
  height: number, //in cm
  weight: number, //in kg
) => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const query = { _id: new ObjectId(id) };
  const updates = {
    $set: {
      name,
      specie,
      height,
      weight,
    },
  };

  const result = await collection.updateOne(query, updates);

  return result;
};

export const remove = async (id: string) => {
  const db = await getDb();
  const collection = db.collection<Animals>("animals");

  const query = { _id: new ObjectId(id) };
  const result = await collection.deleteOne(query);

  return result;
};