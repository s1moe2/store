// let query = {_id: ObjectId(req.params.id)};

import {ObjectId} from 'mongodb'
import bcrypt from "bcrypt";
import { Vegetables } from "./vegetables.model";
import { getDb } from '../db/mongo'
// import db from "../db";

const db = { users: [] as Vegetables[] } // TODO: DEBUG ONLY

export const getAll = async () => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("users");

  let query = {};
  const result = await collection.find<Vegetables>(query)
    .limit(50)
    .toArray();

  return result;
}


export const getById = async (id: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("users");

  let query = {_id: new ObjectId(id)};
  let result = await collection.findOne<Vegetables>(query);

  return result;
}


export const getByUsername = async (username: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("users");

  let query = {username};
  let result = await collection.findOne<Vegetables>(query);

  return result;
}



export const create = async (username: string, email: string, name: string, password: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("users");

  const user = await getByUsername(username)

  if (user) {
    throw new RangeError("user already exists");
  }

  const hash = await bcrypt.hash(password, 12);

  const newVegetable: Vegetables = {
    name,
    color,
    price,
  };

  return await collection.insertOne(newVegetable);
}


export const update = async (id: string, name: string, email: string) => {
  const db = await getDb();
  const collection = db.collection<User>("users");

  let query = {_id: new ObjectId(id)};  
  const updates = {
    $set: {
      name,
      color,
      price,
    }
  };
  let result = await collection.updateOne(query, updates);
  return result;
}


export const remove = async (id: string) => {
  const db = await getDb();
  const collection = db.collection<Vegetables>("users");

  let query = {_id: new ObjectId(id)};
  let result = await collection.deleteOne(query);

  return result;
}

