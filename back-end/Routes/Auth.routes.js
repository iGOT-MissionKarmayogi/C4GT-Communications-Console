import { authUser,registerUser,logout } from "../Controllers/Auth.controller.js";
import express from "express";


const AuthRouter = express.Router();

AuthRouter.post("/login", authUser);
AuthRouter.post("/register", registerUser);
AuthRouter.post("/logout", logout);


export default AuthRouter;