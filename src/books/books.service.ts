import { getDb } from "../db/mongo";
import { ObjectId } from "mongodb";
import { Book } from "../books/books.model";

export const create = async (isbn: string, name: string, author: string, pages: number) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  // ToDo: Can be improved - This config only needs to be ran once, not every POST call;
  await collection.createIndex({ isbn: 1 }, { unique: true });

  const newBook: Book = {
    isbn,
    name,
    author,
    pages,
  };

  return await collection.insertOne(newBook);
};

export const update = async (isbn: string, name: string, author: string, pages: number) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  let query = { isbn: isbn };
  const updates = {
    $set: {
      name,
      author,
      pages,
    },
  };
  let result = await collection.updateOne(query, updates);
  return result;
};
