import type { Request, Response } from "express";
import { NotFoundError } from "../errors/errors.ts";
import { getBookById, getAllBooks } from "../models/db.ts";

export async function getBook(req: Request, res: Response) {
  const { bookId } = req.params;

  const book = await getBookById(Number(bookId));

  if (!book) {
    throw new NotFoundError("Book not found");
  }

  res.send(`Book name: ${book.name}`);
}

export async function getBooks(req: Request, res: Response) {
  const books = await getAllBooks();

  if (!books) {
    throw new NotFoundError("No books found");
  }

  res.render("books", { books });
}
