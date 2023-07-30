import { create } from "./books.service";
import { getDb } from "../db/mongo";
import { Book } from "../books/books.model";

jest.mock("../db/mongo", () => ({
  getDb: jest.fn(),
}));

const book: Book = {
  isbn: "idbn",
  name: "name",
  author: "author",
  pages: 123,
};

describe("create", () => {
  it("should insert a new book into the collection", async () => {
    const db = {
      collection: jest.fn().mockReturnValue({
        createIndex: jest.fn(),
        insertOne: jest.fn().mockResolvedValue({
          value: {
            _id: "some-mocked-id",
            isbn: book.isbn,
            name: book.name,
            author: book.author,
            pages: book.pages,
          },
        }),
      }),
    };
    (getDb as jest.Mock).mockResolvedValue(db);

    const result = await create(book.isbn, book.name, book.author, book.pages);

    expect(getDb).toHaveBeenCalledTimes(1);
    expect(db.collection).toHaveBeenCalledWith("books");
    expect(db.collection().createIndex).toHaveBeenCalledWith({ isbn: 1 }, { unique: true });
    expect(db.collection().insertOne).toHaveBeenCalledWith(book);
    expect(result).toEqual({
      value: {
        _id: "some-mocked-id",
        isbn: book.isbn,
        name: book.name,
        author: book.author,
        pages: book.pages,
      },
    });
  });
});
