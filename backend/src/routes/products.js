import express from "express"
import productController from "../controllers/productsController.js";

//"Router()" nos ayudará a colocar los métodos
//Que tendrá el endpoint

const router = express.Router();

router.route("/")
.get(productController.getProducts)
.post(productController.insertProducts)

//Si la ruta trae ID se trata de un update o delete
router.route("/:id")
.put(productController.updateProducts)
.delete(productController.deleteProducts);

export default router;