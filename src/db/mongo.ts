import { MongoClient, Db } from "mongodb";

const dbUsr = "dbUser";
const dbPwd = "123";
const uri = `mongodb+srv://${dbUsr}:${dbPwd}@cluster0.gppdsiv.mongodb.net/store?retryWrites=true&w=majority`; // Db Gerardo
// const uri = `mongodb+srv://${dbUsr}:${dbPwd}@cluster0.cfdok48.mongodb.net/?retryWrites=true&w=majority`; //DB Pedro

let db: Db

export const getDb = async (): Promise<Db> => {
  if(db) {
    return db;
  }

  const client = new MongoClient(uri);
  const conn = await client.connect();

  db = conn.db("store"); 
  if(!db) { 
    throw new Error('Database `store` does not exist')
  }

  return db
}

