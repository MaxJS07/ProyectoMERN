import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import customerModel from "../models/customer.js"
import {config} from "../config.js"

//Array de funciones
const loginCustomerController = {}

loginCustomerController.login = async (req, res) =>{
    try {
        //#1 Solicitamos correo y contraseña
        const {email, password} = req.body

        //#2 Verificamos que el correo exista
        const userExist = await customerModel.findOne({email});

        //Si no se encuentra
        if(!userExist){
            return res.status(404).json({status: "Not found", message: "The user was not found"});
        }

        //Verificar que esté bloqueada
        if(userExist.timeOut && userExist.timeOut > Date.now()){
            return res.status(403).json({status:"Access not allowed", message:"The account is blocked"})
        }
        
        //Verficamos la contraseña
        const isMatch = await bcrypt.compare(password, userExist.password)

        if(!isMatch){
            //Si se equivoca en la contraseña
            //Le sumamos 1 a los intentos de login
            userExist.loginAttempts = (userExist.loginAttempts || 0) +1

            //Se bloquea la cuenta después de 5 intentos fallidos
            if(userExist.loginAttempts >= 5){
                userExist.timeOut = Date.now() + 15 * 60 * 1000

                //Volvemos a poner en 0 los intentos fallidos
                userExist.loginAttempts = 0;

                await userExist.save();
                return res.status(403).json({status: "Forbidden", message: "The account has many login attempts. It was blocked for 15 minutes, try again later"})
            }

            await userExist.save();

            return res.status(403).json({status: "Forbidden", message: "Wrong password"})
        }


        //Inicio de sesion correcto
        userExist.loginAttempts = 0;
        userExist.timeOut = null;
        await userExist.save();

        //Generamos el token
        const token = jsonwebtoken.sign(
            //#1 Que vamos a guardar
            {id: userExist._id, userType: "customer"},
            //#2 Secret key
            config.JWT.secretKey,
            //#3 Tiempo de expiración
            {expiresIn: "30d"}
        )

        //Guardamos el token en una cookie
        res.cookie("authCookie", token);

        //Lusto
        return res.status(200).json({status: "OK", message: "Login successful"})


    } catch (error) {
        return res.status(500).json({status:"Internal server error", message: error })
    }
}

export default loginCustomerController;