import dotenv from "dotenv"

//Ejecutamos la librería dotenv
dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server:{
        PORT: process.env.PORT
    }
}