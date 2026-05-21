import providerModel from "../models/providers.js";
import { v2 as cloudinary } from "cloudinary"

//Array de funciones
let providerController = {}

//SELECT
providerController.getAllProviders = async (req, res) => {
    try {
        const providers = await providerModel.find();
        return res.status(200).json(providers)
    } catch (error) {
        console.log(error + ": " + error.message)
        return res.status(500).json({ message: "Internal server error: " + error.message })
    }
}

//POST
providerController.insertProvider = async (req, res) => {

    try {
        //Solicitamos datos
        const { name, phone } = req.body;

        const newProvider = providerModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        })

        //Guardamos en la base
        await newProvider.save();

        return res.status(200).json({message: "The provider was successfuly saved"})
    } catch (error) {
        console.log(error + ": " + error.message)
        return res.status(500).json({ message: "Internal server error: " + error.message })
    }
    
}

providerController.deleteProvider = async (req, res) => {
    try {
        //Buscamos el registro a eliminar
        const providerFound = await providerModel.findById(req.params.id);

        //Eliminar imagen de cloudinaru
        await cloudinary.uploader.destroy(providerFound.public_id);

       //Eliminar de la base
        await providerModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message:"Provider deleted"})
    } catch (error) {
        console.log(error + ": " + error.message)
        return res.status(500).json({ message: "Internal server error: " + error.message })
    }
}

providerController.updateProvider = async (req, res) => {
    try {
        const {name, phone} = req.body;

        const providerFound = await providerModel.findById(req.params.id);

        const updatedData = {
            name,
            phone
        }

        //Si viene una imagen es porque se va a actualizar
        if(req.file){
            //Eliminamos la anterior
            await cloudinary.uploader.destroy(providerFound.public_id)

            updatedData.image = req.file.path;
            updatedData.public_id = req.file.name;

        }

        //Guardamos todo lo actualizado
        await providerModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).json({message:"Provider updated"})
    } catch (error) {
        console.log(error + ": " + error.message)
        return res.status(500).json({ message: "Internal server error: " + error.message })
    }   
}

export default providerController;