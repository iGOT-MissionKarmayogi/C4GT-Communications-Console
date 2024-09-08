import { uploadUserData, getUsers } from "../Controllers/WhatsappTemplate.controller.js";
import express from "express";
import { verify, roleAuthorization } from "../middlewares/authenticated.js";

const WhatsappRouter = express.Router();



// Whatsapp users routes
WhatsappRouter.get("/users", verify,roleAuthorization(['Admin']), getUsers)
WhatsappRouter.post("/users",verify, roleAuthorization(['Admin']), uploadUserData);


export default WhatsappRouter;
