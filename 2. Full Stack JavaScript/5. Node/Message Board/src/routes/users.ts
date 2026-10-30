import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/usersController.ts";

export const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:user", getUser);
