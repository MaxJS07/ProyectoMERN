import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import nodemailer from "nodemailer"
import { config } from "../config.js"
import customerModel from "../models/customer.js"
import SendmailTransport from "../utils/sendRecoveryMail.js"
import { decode } from "punycode"

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    try {

        //Solicitamos datos
        const { email } = req.body;

        //Validar si el email esta en la BD
        const userFound = await customerModel.findOne({ email });

        if (!userFound) {
            return res.status(404).json({ message: "User not found" })
        }

        //Generamos el número aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //Datos que vamos a guardar
            { email, randomCode, userType: "customer", verified: false },
            ///Secret key
            config.JWT.secretKey,
            //CUando expira
            { expiresIn: "15m" }
        );

        res.cookie("recoveryCookie", token, { maxAge: 15 * 60 * 1000 })


        //Con la cookie creada pasamos a enviar el correo
        //#1 ¿Quién lo envía?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.emailUser,
                pass: config.email.emailPass
            }
        })

        //#2 Quien lo recibe
        const mailOptions = {
            from: config.email.emailUser,
            to: email,
            subject: "Código de recuperación de contraseña.",
            body: "El código vence en 15 min, usalo para recuperar tu contraseña.",
            html: SendmailTransport(randomCode)
        }

        //Enviamos el correo 

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error enviando el correo" })
            }
        })

        return res.status(200).json({ message: "Email sent" })

    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: error })
    }
}

recoveryPasswordController.verifyCode = async (req, res) => {

    try {
        //#1 Solicitamos el codigo
        const { code } = req.body;

        //Obtenemos la información que esta adentro del token
        //Accedemos a la cookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secretKey)

        if (code !== decoded.randomCode) {
            return res.status(400).json({ message: "Invalid code" })
        }

        //Si el codigo esta bien, pasamos a crear el token donde ya esta verificado
        const newToken = jsonwebtoken.sign(
            //Que vamos a guardar
            { email: decoded.email, userType: "customer", verified: true },
            //secret key
            config.JWT.secretKey,
            { expiresIn: "15m" }
        )

        res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 })

        return res.status(200).json({status: "success", message: "Code verified succesfully"})
    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: error })
    }

}

recoveryPasswordController.newPassword = async (req, res) =>{
    try {
        //Solicitamos datos
        const {newPassword, confirmNewPassword} = req.body

        //Comparar las dos contraseñas
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({status:"error", message:"Passwords doesn't match"})
        }

        //Si coinciden, verificamos que el token de recuperación de contraseña esté verificado
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secretKey)

        if(!decoded.verified){
            return res.status(400).json({status:"error", message: "The code is not verified"})
        }

        //Si esta todo bien, encriptamos la nueva password
        const passwordHash = await bcrypt.hash(newPassword, 10)

        await customerModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie");

        return res.status(200).json({status: "success", message: "The password was updated"})

    } catch (error) {
        return res.status(500).json({ status: "Internal Server Error", message: error })
    }
}

export default recoveryPasswordController;