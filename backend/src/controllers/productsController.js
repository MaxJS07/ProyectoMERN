const productController = {};

//Import del schema de la colección
//que vamos a ocupar
import productsModel from "../models/products.js";

//SELECT
productController.getProducts = async (req, res) => {
    const products = await productsModel.find()
    res.json(products)
}

//POST
productController.insertProducts = async (req, res) =>{
    //Solicitamos los campos
    const {name, description, price, stock} = req.body;

    const newProduct = new productsModel({name, description, price, stock})

    await newProduct.save();

    res.json({message: "Product saved"});
}

//ELIMINAR
productController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id)
    res.json({message: "Product deleted"})
}

//ACTUALIZAR
productController.updateProducts = async (req, res) =>{
    //1. Solicitamos valores nuevos
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        stock
    }, {new: true})

    res.json({message: "Product updated"})

};

export default productController;