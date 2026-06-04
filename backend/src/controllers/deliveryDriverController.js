import deliveryDriverModel from "../models/deliveryDrivers.js"
import { v2 as cloudinary } from "cloudinary";

const controller = {};

controller.get = async (req, res) => {
    try {
        const drivers = await deliveryDriverModel.find()
        return res.status(200).json(drivers)
    } catch (error) {
        console.log("Error: " + error.message)
        return res.status(500).json({ info: error.message })
    }
}

controller.insert = async (req, res) => {
    try {

        const {
            name,
            phone,
            cars,
            isActive
        } = req.body

        //llenamos el modelo
        const newDriver = new deliveryDriverModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        //Guardamos
        await newDriver.save();
        return res.status(200).json({ info: "The driver was added" });
    } catch (error) {
        console.log("Error: " + error.message)
        return res.status(500).json({ info: error.message })
    }
}

controller.delete = async (req, res) => {
    try {
        //Buscamos para actualizar
        const driverFound = await deliveryDriverModel.findById(req.params.id)

        await cloudinary.uploader.destroy(driverFound.public_id);

        //Eliminamos al repartidor
        await deliveryDriverModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ info: "The driver was deleted" })

    } catch (error) {
        console.log("Error: " + error.message)
        return res.status(500).json({ info: error.message })
    }
}

controller.update = async (req, res) => {
    try {

        const driverFound = await deliveryDriverModel.findById(req.params.id)
        if (!driverFound) {
            return res.status(404).json({ info: "Not found" })
        }

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        if (req.file) {
            await cloudinary.uploader.destroy(driverFound.public_id)
            updatedData.image = req.file.path;
            updatedData.public_id = req.file.filename
        }

        //Guardamos
        await deliveryDriverModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        )
        
        return res.status(200).json({info: "Updated"})
    } catch (error) {
        console.log("Error: " + error.message)
        return res.status(500).json({ info: error.message })
    }
}

export default controller;
