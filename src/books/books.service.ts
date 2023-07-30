import { getDb } from "../db/mongo";
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

export const getAll = async () => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  let query = {};
  const result = await collection.find<Book>(query).limit(50).toArray();

  return result;
};

export const getByIsbn = async (isbn: string) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  let query = { isbn: isbn };
  let result = await collection.findOne<Book>(query);

  return result;
};

export const remove = async (isbn: string) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  let query = { isbn: isbn };
  let result = await collection.deleteOne(query);

  return result;
};
