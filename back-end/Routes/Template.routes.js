import {
  createTemplate,
  getTemplates,
  deleteTemplate,
  updateTemplate,
} from "../Controllers/Template.controller.js";
import express from "express";
import { verify, roleAuthorization } from "../middlewares/authenticated.js";
import { SendSMS } from "../Controllers/Sms.controller.js";
import HistoryModel from "../Models/History.model.js";

const TemplateRouter = express.Router();

TemplateRouter.get("/history", async (req, res) => {
  try {
    const history = await HistoryModel.find().populate("TemplateId","templateId");
    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

TemplateRouter.get(
  "/:type",
  verify,
  roleAuthorization(["Admin"]),
  getTemplates
);
TemplateRouter.post(
  "/create",
  verify,
  roleAuthorization(["Admin"]),
  createTemplate
);
TemplateRouter.delete(
  "/delete/:id",
  verify,
  roleAuthorization(["Admin"]),
  deleteTemplate
);
TemplateRouter.put(
  "/update/:id",
  verify,
  roleAuthorization(["Admin"]),
  updateTemplate
);
TemplateRouter.post("/send", verify, roleAuthorization(["Admin"]), SendSMS);

export default TemplateRouter;
