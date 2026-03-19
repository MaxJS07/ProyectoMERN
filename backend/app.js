import express from "express"
import productsRoute from "./src/routes/products.js"
import branchesRoute from "./src/routes/branches.js"
import employeesRoute from "./src/routes/employees.js"
import reviewsRoute from "./src/models/reviews.js"

const app = express();

//PARA ACEPTAR JSON DESDE POSTMAN:
app.use(express.json())

app.use("/api/products", productsRoute)

app.use("/api/branches", branchesRoute)

app.use("/api/employees", employeesRoute)

app.use("/api/reviews", reviewsRoute)

export default app;