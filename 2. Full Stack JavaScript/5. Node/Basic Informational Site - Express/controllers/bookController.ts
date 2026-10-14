import type { Request, Response } from "express";
import { getBookById } from "../db.ts";
import { NotFoundError } from "../errors/errors.ts";

export default async function getBook(req: Request, res: Response) {
  const { bookId } = req.params;

  const book = await getBookById(Number(bookId));

  if (!book) {
    throw new NotFoundError("Book not found");
  }

  res.send(`Book name: ${book.name}`);
}
