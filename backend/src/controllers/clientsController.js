const clientController = {};

import clientsModel from "../models/clients.js"

//SELECT
clientController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients)
    } catch (error) {
        return res.status(500).json({status: "Internal server error", message: error})
    }
}

//INSERTAR
clientController.insertClient = async (req, res) => {
    try {
        
        let {name, email, password, birthday, status, isVerified, loginAttempts, timeOut} = req.body;

        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        if(!name || !email || !password || birthday === null || status === null || isVerified === null || loginAttempts === null || timeOut === null){
            return res.status(400).json({message: "All fields are required"})
        }

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(email.lenght < 6){
            return res.status(400).json({message: "The email is too short, it has to be at least 6 letters long"})
        }

        
    } catch (error) {
        
    }
}

//ELIMINAR
clientController.deleteClient = async (req, res) => {
    try {
        const deleteClient = await clientsModel.findByIdAndDelete(req.params.id)
        
        //Validamos si no fue borrado
        if(!deleteClient){
            return res.status(404).json({status: "Not Found", message: "The client you wanted to delete was not found"});
        }

        return res.status(200).json({status:"success", message:"The client was deleted"})
    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

//ACTUALIZAR
clientController.updateClient = async (req, res) => {
    try {
        //Solicitamos datos
        let {name, email, password, birthday, status, isVerified, loginAttempts, timeOut} = req.body;

        //Validaciones

        //SANITIZAR
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(email.lenght < 6){
            return res.status(400).json({message: "The email is too short, it has to be at least 6 letters long"})
        }

        //actualizamos
        const updatedClient = await clientController.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                password,
                birthday,
                status,
                isVerified,
                loginAttempts,
                timeOut
            },
            {
                new: true
            }
        )

        //si no actualiza:
        if(!updatedClient){
            return res.status(404).json({status: "Not found", message: "The client was not updated because it wasn't found"})
        }
        
        return res.status(200).json({status: "success", message: "The client was updated."})

    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

export default clientController;