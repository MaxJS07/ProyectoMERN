import jsonwebtoken from "jsonwebtoken"
import {config} from "../config.js"

export const validateAuthCookie = (allowedTypes = []) =>{
    return (req, res, next) =>{
        try {
            
            //#1 - Extraer el token que está en el cookie (authCookie)
            //Ya que en esta cookie está el tipo de usuario que inició sesión
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "No cookie found. Authorization required"})
            }

            //#2 Extraer toda la info de la cookie
            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secretKey)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message: "Access denied"})
            }

            next();
            
        } catch (error) {
            return res.status(500).json({message: "Internal server error"})
        }
    }
}