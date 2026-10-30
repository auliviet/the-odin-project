import type { Request, Response } from "express";
import { DB } from "../models/db.ts";
import { ErrorNotFound } from "../errors/customErrors.ts";

export async function getAllMessages(req: Request, res: Response) {
  const messages = await DB.getAllMessages();

  if (!messages) {
    throw new ErrorNotFound("No message found");
  }

  res.render("index", { messages });
}

export async function getForm(req: Request, res: Response) {
  res.render("form");
}

export async function postForm(req: Request, res: Response) {
  DB.postMessage(req.body.text, req.body.user);
  res.redirect(process.env.BASE_PATH || "/");
}
