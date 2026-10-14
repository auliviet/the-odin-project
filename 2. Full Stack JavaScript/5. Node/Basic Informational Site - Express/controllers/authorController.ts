import type { Request, Response } from "express";
import { NotFoundError } from "../errors/errors.ts";
import { getAllAuthors, getAuthorById } from "../models/db.ts";

export async function getAuthor(req: Request, res: Response) {
  const { authorId } = req.params;

  const author = await getAuthorById(Number(authorId));

  if (!author) {
    throw new NotFoundError("Author not found - from NotFoundError");
  }

  res.send(`Author name: ${author?.name}`);
}

export async function getAuthors(req: Request, res: Response) {
  const authors = await getAllAuthors();

  if (!authors) {
    throw new NotFoundError("No authors found");
  }

  res.render("authors", { authors });
}
