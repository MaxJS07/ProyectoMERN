import express from "express"
import brandsController from "../controllers/brandsController.js";

const router = express.Router();

router.route("/")
.get(brandsController.getBrands)
.post(brandsController.insertBrands)

router.route("/:id")
.put(brandsController.updateBrand)
.delete(brandsController.deleteBrand)

export default router;