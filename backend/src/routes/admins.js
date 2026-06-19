import express from "express";
import adminController from "../controllers/adminsController.js";
import loginAdminController from "../controllers/loginAdminController.js"

const router = express.Router();

router.route("/")
.get(adminController.getAdmins)
.post(adminController.insertAdmin)

router.route("/:id")
.put(adminController.updateAdmin)
.delete(adminController.deleteAdmin)

router.route("/login")
.post(loginAdminController.login)

export default router;