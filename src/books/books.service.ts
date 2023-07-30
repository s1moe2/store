import { User } from "../users";
import { getDb } from "../db/mongo";
import { Book } from "../books/books.model";

export const create = async (isbn: string, name: string, author: string, pages: number) => {
  const db = await getDb();
  const collection = db.collection<Book>("books");

  // ToDo: Implement logic that guarantees that ISBN is UNIQUE on the DB.
  // Question: Can it be configured in the DB? Or do we had custom logic on our side?
  //const user = await getByUsername(username)
  //
  //if (user) {
  //  throw new RangeError("user already exists");
  //}

  const newBook: Book = {
    isbn,
    name,
    author,
    pages,
  };

  return await collection.insertOne(newBook);
};
