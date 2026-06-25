import eventModel from "../models/events.js"

const controller = {};

//GET PAGINADO
controller.getEvents = async (req, res) => {
    try {

        //Solicitar en qué pagina estamos
        //y cual es el límite de registros
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 20

        const skip = (page - 1) * limit;

        const events = await eventModel.find().skip(skip).limit(limit)
        return res.status(200).json(events)
    } catch (error) {
        console.log("Error:" + error.message)
        return res.status(500).json({ info: error.message })
    }
}

//INSERT
controller.insertEvent = async (req, res) => {
    try {
        //Datos
        const { customerName, cantProducts, eventDate } = req.body;

        const newEvent = new eventModel({
            customerName,
            cantProducts,
            eventDate
        })

        //Guardamos el nuevo
        await newEvent.save();
        return res.status(201).json({ message: "Evento creado", data: newEvent })
    } catch (error) {
        console.log("Error:" + error.message)
        return res.status(500).json({ info: error.message })
    }
}

//DELETE
controller.deleteEvent = async (req, res) => {
    try {
        await eventModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Evento eliminado" })
    } catch (error) {
        console.log("Error:" + error.message)
        return res.status(500).json({ info: error.message })
    }

}

//UPDATE
controller.updateEvent = async (req, res) => {
    try {
        const {customerName, cantProducts, eventDate} = req.body;

        await eventModel.findByIdAndUpdate(
            req.params.id,
            {
                customerName,
                cantProducts,
                eventDate
            },
            {new: true}
        );

        return res.status(200).json({message: "Evento actualizado."})
    } catch (error) {
        console.log("Error:" + error.message)
        return res.status(500).json({ info: error.message })
    }
}

export default controller;