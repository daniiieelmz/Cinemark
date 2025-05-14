import express from "express";
import registerClientController from "../controllers/registerClientController.js";

const router = express.Router();

router.route("/").post(registerClientsController.register);
router.route("/verifyCodeEmail").post(registerClientController.verifyCodeEmail);

export default router;