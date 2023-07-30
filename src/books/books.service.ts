import { User } from "../users";
import { getDb } from "../db/mongo";
import { Book } from "../books/books.model";

export const create = async (isbn: string, name: string, author: string, pages: number) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  // ToDo: Can be improved - This config only needs to be ran once, not every POST call;
  collection.createIndex({ isbn: 1 }, { unique: true });

  const newBook: Book = {
    isbn,
    name,
    author,
    pages,
  };

  return await collection.insertOne(newBook);
};
