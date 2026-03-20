//Array de funciones
const brandsController = {};

//Importo la colección que ocuparemos 
import brandsModel from "../models/brands.js"

//SELECT
brandsController.getBrands = async (req, res) => {
    try {
        const brands = await brandsModel.find()
        return res.status(200).json(brands)
    } catch (error) {
        console.log("Error:" + error)
        return res.status(500).json({status: "Internal server error", message: error})
    }
}

//INSERTAR
brandsController.insertBrands = async (req, res) => {

    try {
        //Solicitamos datos
        let {name, slogan, address, isActive} = req.body;

        //Validaciones

        //SANITIZAR
        name = name?.trim();
        slogan = slogan?.trim()
        address = address?.trim()

        //DATOS NULL O REQUIRE
        if(!name || !slogan || !address ){
            return res.status(400).json({message: "All fields are required"})
        }

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(address.lenght > 100){
            return res.status(400).json({message: "The address is too long."})
        }

        const newBrand = brandsModel({name, slogan, address, isActive})
        await newBrand.save()

        return res.status(201).json({status: "New brand created", data: newBrand})

    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }

}

//ELIMINAR
brandsController.deleteBrand = async (req, res) => {
    try {
        const deleteBrand = await brandsModel.findByIdAndDelete(req.params.id)
        
        //Validamos si no fue borrado
        if(!deleteBrand){
            return res.status(404).json({status: "Not Found", message: "The brand you wanted to delete was not found"});
        }

        return res.status(200).json({status:"success", message:"The brand was deleted"})
    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

//UPDATE
brandsController.updateBrand = async (req, res) => {
    try {
        //Solicitamos datos
        let {name, slogan, address, isActive} = req.body;

        //Validaciones

        //SANITIZAR
        name = name?.trim();
        slogan = slogan?.trim()
        address = address?.trim()

        //Validacion de tamaño
        if(name.lenght < 3){
            return res.status(400).json({message: "The name is too short, it has to be at least 3 letters long"})
        }

        if(address.lenght > 100){
            return res.status(400).json({message: "The address is too long."})
        }

        //actualizamos
        const updatedBrands = await brandsModel.findByIdAndUpdate(
            req.params.id,
            {
                name,
                slogan,
                address,
                isActive
            },
            {
                new: true
            }
        )

        //si no actualiza:
        if(!updatedBrands){
            return res.status(404).json({status: "Not found", message: "The brand was not updated because it wasn't found"})
        }
        
        return res.status(200).json({status: "success", message: "The brand was updated."})

    } catch (error) {
        return res.status(500).json({status: "Internal Server Error", message: error})
    }
}

export default brandsController;