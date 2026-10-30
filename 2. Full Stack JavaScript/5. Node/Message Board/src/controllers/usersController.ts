import type { Request, Response } from "express";
import { DB } from "../models/db.ts";
import { ErrorNotFound } from "../errors/customErrors.ts";

export async function getAllUsers(req: Request, res: Response) {
  const users = await DB.getAllUsers();

  if (!users) {
    throw new ErrorNotFound("No user found");
  }

  res.render("users", { users });
}

export async function getUser(req: Request, res: Response) {
  const user = req.params.user.toString();

  const messages = await DB.getUser(user);

  if (messages.length <= 0) {
    throw new ErrorNotFound("User not found");
  }

  res.render("user", { messages, user });
}
