import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import customerModel from "../models/customer.js"
import { config } from "../config.js"

const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {

    try {
        //Solicitamos datos
        let {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        //Verificamos si el correo ya existe y esta siendo usado por otro cliente
        const emailExist = await customerModel.findOne({ email })

        if (emailExist) {
            return res.status(400).json({ status: "Error", message: "The email is already in use." })
        }

        //Encriptar la contraseña
        const passwordHash = await bcrypt.hash(password, 10)

        //Guardamos todo en la base de datos
        const newCustomer = new customerModel({
            name,
            lastName,
            birthdate,
            email,
            password: passwordHash,
            isVerified: isVerified || false,
            loginAttempts,
            timeOut
        })

        await newCustomer.save()


        //Generamos el código aleatorio para verificar que el usuario si es el dueño del correo
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Guardamos este código en un token
        const tokenCode = jsonwebtoken.sign(
            //#1 - PASO 1 PARA CREAR UN TOKEN
            { email, verificationCode },
            //#2 - SECRET KEY
            config.JWT.secretKey,
            //#3 - ¿Cuando expira
            { expiresIn: "15 min" }
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge : 15 * 60 * 1000})
    } catch (error) {

    }


}