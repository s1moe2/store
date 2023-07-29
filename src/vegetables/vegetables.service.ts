// let query = {_id: ObjectId(req.params.id)};

import { ObjectId } from "mongodb";
import { Vegetables } from "./vegetables.model";
import { getDb } from "../db/mongo";
// import db from "../db";

//check this
const db = { vegetables: [] as Vegetables[] }; // TODO: DEBUG ONLY

export const getAll = async () => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("vegetablesDb");

  let query = {};
  const result = await collection.find<Vegetables>(query).limit(50).toArray();

  return result;
};

export const getByVegetableName = async (name: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("vegetablesDb");

  let query = { name };
  let result = await collection.findOne<Vegetables>(query);

  return result;
};

export const createVegetable = async (_id: string, name: string, color: string, price: number) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("vegetablesDb");

  const vegetable = await getByVegetableName(name);

  if (vegetable) {
    throw new RangeError("vegetable already exists");
  }

  const newVegetable: Vegetables = {
    name,
    color,
    price,
  };

  return await collection.insertOne(newVegetable);
};

export const updateVegetable = async (id: string, name: string, color: string, price: number) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("vegetablesDb");

  let query = { _id: new ObjectId(id) };
  const updates = {
    $set: {
      name,
      color,
      price,
    },
  };
  let result = await collection.updateOne(query, updates);
  return result;
};

export const removeVegetable = async (id: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("vegetablesDb");

  let query = { _id: new ObjectId(id) };
  let result = await collection.deleteOne(query);

  return result;
};
