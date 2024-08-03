import { createTemplate, getTemplates,getSingleTemplate, deleteTemplate, sendMessage } from "../Controllers/WhatsappTemplate.controller.js";
import express from "express";
import { verify, roleAuthorization } from "../middlewares/authenticated.js";

const WhatsappRouter = express.Router();

// Whatsapp Template routes
WhatsappRouter.get("/templates", verify, roleAuthorization(['Admin']), getTemplates);
WhatsappRouter.get("/template",verify,roleAuthorization(['Admin']),getSingleTemplate);
WhatsappRouter.post("/template/create", verify, roleAuthorization(['Admin']), createTemplate);
WhatsappRouter.delete("/template/delete/:id", verify, roleAuthorization(['Admin']), deleteTemplate);

// Whatsapp message routes
WhatsappRouter.post("/message", verify, roleAuthorization(['Admin']), sendMessage);

export default WhatsappRouter;
