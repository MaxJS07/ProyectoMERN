import express from "express";
import employeesController from "../controllers/employeesController.js"

//Uso Router() de la libreria express
//Router es la función que tiene todos los métodos
//get, post, put, delete, etc

const router = express.Router();

router.route("/")
.get(employeesController.getEmployees)

router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee)

export default router;