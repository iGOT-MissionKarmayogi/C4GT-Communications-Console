import { AddUsers,GetUsers } from "../Controllers/user.controller.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/add-users", AddUsers);
userRouter.get("/get-users", GetUsers);

export default userRouter;