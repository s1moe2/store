import express, { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { MongoServerError } from "mongodb";
import { create } from "./books.service";
export const router = express.Router();

const validationPost = [
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

router.post("/", validationPost, async (req: RequestPost, res: Response) => {
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
