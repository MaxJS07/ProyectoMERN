import express from "express"
import deliveryDriverController from "../controllers/deliveryDriverController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router();

router.route("/")
.get(deliveryDriverController.get)
.post(upload.single("image"), deliveryDriverController.insert )

router.route("/:id")
.put(upload.single("image"), deliveryDriverController.update)
.delete(deliveryDriverController.delete)

export default router;