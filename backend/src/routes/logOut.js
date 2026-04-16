import express from "express"
import logoutController from "../controllers/logOutController.js"

const router = express.Router();

router.route("/")
.post(logoutController.logout)

export default router;