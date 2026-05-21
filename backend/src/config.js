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
    },
    cloudinary:{
        cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
    }
}