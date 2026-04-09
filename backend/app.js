import express from "express"
import productsRoute from "./src/routes/products.js"
import branchesRoute from "./src/routes/branches.js"
import employeesRoute from "./src/routes/employees.js"
import reviewsRoute from "./src/routes/reviews.js"
import brandsRoute from "./src/routes/brands.js"
import adminsRoute from "./src/routes/admins.js"
import clientsRoute from "./src/routes/clients.js"
import customersRoute from "./src/routes/customers.js"

const app = express();

//PARA ACEPTAR JSON DESDE POSTMAN:
app.use(express.json())

app.use("/api/products", productsRoute)

app.use("/api/branches", branchesRoute)

app.use("/api/employees", employeesRoute)

app.use("/api/reviews", reviewsRoute)

app.use("/api/brands", brandsRoute)

app.use("/api/admins", adminsRoute)

app.use("/api/clients", clientsRoute )

app.use("/api/customers", customersRoute)

app.use("/api/registerCustomers", )

export default app;