import type { Request, Response } from "express";
import getAuthorById from "../db.ts";
import { NotFoundError } from "../errors/errors.ts";

export default async function getAuthor(req: Request, res: Response) {
  const { authorId } = req.params;

  const author = await getAuthorById(Number(authorId));

  if (!author) {
    throw new NotFoundError("Author not found - from NotFoundError");
  }

  res.send(`Author name: ${author?.name}`);
}
