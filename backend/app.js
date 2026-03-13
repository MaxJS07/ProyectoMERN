import express from "express"
import productsRoute from "./src/routes/products.js"

const app = express();

//PARA ACEPTAR JSON DESDE POSTMAN:
app.use(express.json())

app.use("/api/products", productsRoute)

export default app;