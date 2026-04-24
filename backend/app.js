import express from "express"
import productsRoute from "./src/routes/products.js"
import branchesRoute from "./src/routes/branches.js"
import employeesRoute from "./src/routes/employees.js"
import reviewsRoute from "./src/routes/reviews.js"
import brandsRoute from "./src/routes/brands.js"
import adminsRoute from "./src/routes/admins.js"
import clientsRoute from "./src/routes/clients.js"
import customersRoute from "./src/routes/customers.js"
import registerCustomerRoute from "./src/routes/registerCustomer.js"
import registerEmployeeRoute from "./src/routes/registerEmployee.js"
import loginRoute from "./src/routes/loginCustomer.js"
import logoutRouteCustomer from "./src/routes/logOut.js"
import recoveryPassword from "./src/routes/recoveryPassword.js"
import cors from "cors"

import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //Permitir el envío de cookies y credenciales
    credentials: true
}))

app.use(cookieParser());

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

app.use("/api/registerCustomers", registerCustomerRoute)

app.use("/api/registerEmployees", registerEmployeeRoute)

app.use("/api/login", loginRoute)

app.use("/api/logout", logoutRouteCustomer)

app.use("/api/recoveryPassword", recoveryPassword)

export default app;