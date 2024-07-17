import { sendEmail } from "../Controllers/Email.controller.js";

import express from "express";
import { verify, roleAuthorization } from "../middlewares/authenticated.js";

const EmailRouter = express.Router();

EmailRouter.post("/send", verify, roleAuthorization(['Admin']), sendEmail);

export default EmailRouter;

