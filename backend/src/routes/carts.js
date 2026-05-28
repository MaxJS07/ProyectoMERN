import express from "express"
import cartController from "../controllers/cartController.js"

const router = express.Router();

router.route("/")
.get(cartController.getCarts)
.post(cartController.inserCart)

router.route("/:id")
.get(cartController.getCartById)
.put(cartController.updateCart)
.delete(cartController.deleteCart)

export default router;