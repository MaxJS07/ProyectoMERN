import dotenv from "dotenv"

//Ejecutamos la librería dotenv
dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server:{
        PORT: process.env.PORT
    },
    JWT:{
        secretKey : process.env.JWT_SECRET_KEY
    },
    email:{
        emailUser: process.env.USER_EMAIL,
        emailPass: process.env.USER_PASSWORD
    }
}