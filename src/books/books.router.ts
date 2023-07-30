import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { MongoServerError } from "mongodb";
import { create, update, getAll, getByIsbn, remove } from "./books.service";
export const router = express.Router();

const validationBook = [
  body("isbn").notEmpty().exists().isISBN(),
  body("name").notEmpty().exists(),
  body("author").notEmpty().exists(),
  body("pages").notEmpty().exists().isInt({ min: 10 }),
];

type RequestPost = Request<
  { id: string },
  unknown,
  { isbn: string; name: string; author: string; pages: number }
>;

router.post("/", validationBook, async (req: RequestPost, res: Response) => {
  const validationRes = validationResult(req);
  if (!validationRes.isEmpty()) {
    return res.status(400).json({ error: validationRes.array() });
  }

  try {
    const result = await create(req.body.isbn, req.body.name, req.body.author, req.body.pages);
    return res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return res.status(409).json({ error });
    }
  }
});

type RequestPut = Request<
  { isbn: string },
  unknown,
  { isbn: string; name: string; author: string; pages: number }
>;

router.put("/:isbn", validationBook, async (req: RequestPut, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ error: validation.array() });
  }

  const { name, author, pages } = req.body;

  const result = await update(req.params.isbn, name, author, pages);
  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "book not found" });
  }

  res.status(200).json(result);
});

router.get("/", async (_req: Request, res: Response) => {
  const books = await getAll();
  res.status(200).json(books);
});


router.get("/:isbn", async (req: Request, res: Response) => {
  const book = await getByIsbn(req.params.isbn)

  if (!book) {
    return res.status(404).json({ error: "book not found" });
  }
  res.status(200).json(book);
});


router.delete("/:isbn", async (req: Request, res: Response) => {
  const result = await remove(req.params.isbn)

  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "book not found" });
  }

  res.status(204).json();
});
