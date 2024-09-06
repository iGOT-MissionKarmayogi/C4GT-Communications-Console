import { createTemplate,getTemplates,deleteTemplate,updateTemplate } from "../Controllers/Template.controller.js";
import express from "express";
import { verify,roleAuthorization } from "../middlewares/authenticated.js";

const TemplateRouter = express.Router();

TemplateRouter.get("/:type",verify,roleAuthorization(['Admin']),getTemplates);
TemplateRouter.post("/create",verify,roleAuthorization(['Admin']),createTemplate);
TemplateRouter.delete("/delete/:id",verify,roleAuthorization(['Admin']),deleteTemplate);
TemplateRouter.put("/update/:id",verify,roleAuthorization(['Admin']),updateTemplate);

export default TemplateRouter;
