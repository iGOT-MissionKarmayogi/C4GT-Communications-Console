import { createTemplate,getTemplates,deleteTemplate } from "../Controllers/Template.controller.js";
import express from "express";
import { verify,roleAuthorization } from "../middlewares/authenticated.js";

const TemplateRouter = express.Router();

TemplateRouter.get("/:type",verify,roleAuthorization(['Admin']),getTemplates);
TemplateRouter.post("/create",verify,roleAuthorization(['Admin']),createTemplate);
TemplateRouter.delete("/delete/:id",verify,roleAuthorization(['Admin']),deleteTemplate);

export default TemplateRouter;
