import nodemailer from "nodemailer"
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcryptjs"

import employeeModel from "../models/employees.js"
import {config} from "../config.js"
import { register } from "module"

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) =>{

    try {
        //Solicitamos datos
        let {
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password,
            isVerified,
            idBranches
        } = req.body

        //Verificamos que el correo no exista y esté en uso 
        const emailExist = await employeeModel.findOne({email})

        if(emailExist){
            return res.status(400).json({status: "error", message: "The email is already in use"})
        }

        //Encriptamos la contraseña
        const passHash = await bcrypt.hash(password, 10)

        //Guardamos en la base
        const newEmployee = new employeeModel({
            name,
            lastName,
            salary,
            DUI,
            phone,
            email,
            password: passHash,
            isVerified: isVerified || false,
            idBranches
        })

        await newEmployee.save();

        //Acá generamos el código aleatorio para verificar el usuario
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Creamos un jwt que lleve ese codigo
        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secretKey,
            {expiresIn: "15 min"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge : 15 * 60 * 1000})

        //Enviar correo con el codigo
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: config.email.emailUser ,
                pass: config.email.emailPass
            }
        })

        const mailOptions = {
            from: config.email.emailUser,
            to: email,
            subject: "Verificación de correo",
            text: "Empleado, para verificar tu cuenta, utiliza este código: " + verificationCode + "." + " Expira en 15 minutos"
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("error: " + error)
                return res.status(500).json({status: "error", message: error})
            }

            res.status(200).json({message: "Email sent"})
        })

    } catch (error) {
        console.log("Error: " + error)
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

registerEmployeeController.verifyCode = async (req, res) => {
    try {
        //solicitamos el code
        const {verificationCodeRequest} = req.body;

        //Obtenemos el token de la cookie
        const token = req.cookies.verificationTokenCookie

        //Extraemos info del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secretKey)
        const {email, verificationCode : storedCode} = decoded;

        //Comparamos el token que manda el usuario con el del token
        if(verificationCodeRequest !== storedCode){
            return res.status(400).json({status: "error", messsage: "Invalid code"})
        }

        //SI es correcto el codigo:
        const employee = await employeeModel.findOne({email});
        employee.isVerified = true;
        await employee.save();

        //Limpiamos la cookie
        res.clearCookie("vericationTokenCookie")
        res.json({message: "The email has been succesfully verified"})

    } catch (e) {
        console.log("Error: " + error)
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

export default registerEmployeeController;