import express from "express";
import adminController from "../controllers/adminsController.js";

const router = express.Router();

router.route("/")
.get(adminController.getAdmins)
.post(adminController.insertAdmin)

router.route("/:id")
.put(adminController.updateAdmin)
.delete(adminController.deleteAdmin)

export default router;