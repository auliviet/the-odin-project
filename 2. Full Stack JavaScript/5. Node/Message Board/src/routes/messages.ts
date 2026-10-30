import { Router } from "express";
import { getAllMessages } from "../controllers/messageController.ts";
import { getForm, postForm } from "../controllers/messageController.ts";

export const messageRouter = Router();

messageRouter.get("/", getAllMessages);
messageRouter.get("/new", getForm);
messageRouter.post("/new", postForm);
