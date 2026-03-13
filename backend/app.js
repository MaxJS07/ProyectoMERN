import express from "express"
import productsRoute from "./src/routes/products.js"
import branchesRoute from "./src/routes/branches.js"

const app = express();

//PARA ACEPTAR JSON DESDE POSTMAN:
app.use(express.json())

app.use("/api/products", productsRoute)

app.use("/api/branches", branchesRoute)

export default app;