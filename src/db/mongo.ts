import { MongoClient, Db } from "mongodb";

const dbUsr = "admin";
const dbPwd = "admin";
const uri = `mongodb+srv://${dbUsr}:${dbPwd}@cluster0.jip2mso.mongodb.net/store?retryWrites=true&w=majority`;

let db: Db;

export const getDb = async (): Promise<Db> => {
  if (db) {
    return db;
  }

  const client = new MongoClient(uri);
  const conn = await client.connect();

  db = conn.db("store");
  if (!db) {
    throw new Error("Database `store` does not exist");
  }

  return db;
};
