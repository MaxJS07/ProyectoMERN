const adminController = {};

import adminModel from "../models/admins.js"

//SELECT
adminController.getAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find()
        return res.status(200).json(admins)
    } catch (error) {
        return res.status(500).json({status: "Internal server error", message: error})
    }
}

//INSERTAR
adminController.insertAdmin = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !email || !password || isVerified === null){
            return res.status(400).json({message: "All fields are required"})
        }

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(name.lenght < 6){
            return res.status(400).json({message: "The email is too short, it has to be at least 6 letters long"})
        }

        const newAdmin = adminModel({name, email, password, isVerified})
        await newAdmin.save();

        return res.status(201).json({status: "success", message: "The admin was created", data: newAdmin})

    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

//DELETE
adminController.deleteAdmin = async (req, res) => {
    try {
        const deleteAdmin = await adminModel.findByIdAndDelete(req.params.id)

        if(!deleteAdmin){
            return res.status(404).json({status: "Not Found", message: "The admin you wanted to delete was not found"});
        }

        return res.status(200).json({status: "success", message: "The admin was succesfully deleted"})
    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

//UPDATE
adminController.updateAdmin = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(name.lenght < 6){
            return res.status(400).json({message: "The email is too short, it has to be at least 6 letters long"})
        }

        //Actualizamos
        const updatedAdmin = await adminModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                password,
                isVerified
            },
            {
                new: true   
            }
            
        )

        //Si no actualiza
        if(!updatedAdmin){
            return res.status(404).json({status: "Not found", message: "The admin was not updated because it wasn't found"})
        }

        return res.status(200).json({status: "success", message:"The admin was updated"})

    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
    
}

export default adminController;