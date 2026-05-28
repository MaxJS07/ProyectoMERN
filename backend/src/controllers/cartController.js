import cartModel from "../models/cart.js";
import productsModel from "../models/products.js"
import customerModel from "../models/customer.js"

const cartController = {}

//SELECT
cartController.getCarts = async (req, res) => {
    try {
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name price")

        return res.status(200).json(carts)
    } catch (error) {
        return res.status(500).json("Error: " + error.message)
    }
}

//SELECT BY ID
cartController.getCartById = async (req,res) => {
    try{
        const cart = cartModel.findById(req.params.id)
        .populate("customerId", "name email")
        .populate("products.productId", "name price")

        return res.status(200).json(cart)

    } catch(error) {
        return res.status(500).json("Error: " + error.message)
    }
}

//INSERT
cartController.inserCart = async (req, res) => {
    try {
        //Datos a ingresar
        const {customerId, products, status} = req.body;

        /////////Calculamos el subtotal de cada array de productos y el total//////////////
        let total = 0;
        
        //Arreglo de productos
        let newProducts = []
        
        //De todos los productos, vamos a recorrer uno por uno, calculando los subtotales y el total a pagar
        for (let i = 0; i < products.length; i++){
            //Busamos el producto en la DB
            const productFound = await productsModel.findById(products[i].productId)
            //Calculamos subtotal
            const subtotal = productFound.price * products[i].quantity

            //Calculamos el total
            total += subtotal 

            //Guardamos cada array de productos junto con la cantidad y el subtotal
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        //Guardamos
        const newCart = new cartModel({
            customerId,
            products: newProducts,
            total, status
        })

        await newCart.save()
        return res.status(200).json({info: "Se añadió el carrito"})

    } catch (error) {
        return res.status(500).json("Error: " + error.message)
    }
}

//UPDATE
cartController.updateCart = async (req, res) =>{
    try {
        //Datos para actualizar
        const {customerId, products, status} = req.body;

        //CALCULO DE SUBTOTALES Y TOTALS
        let total = 0;

        let newProducts = []
        for(let i = 0 ; i < products.length; i++){
            //Buscamos el producto
            const productFound = await productsModel.findById(products[i].productId)
            //Calculamos el subtotal
            const subtotal = productFound.price * products[i].quantity;
            //Calculamos el total
            total += subtotal
            //Guardamos cada objeto en el array
            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        //Actualizamos en la base de datos
        const updatedCart = await cartModel.findByIdAndUpdate(
            req.params.id,
            {
                customerId,
                products: newProducts,
                total,
                status
            }, {new: true}
        )

        return res.status(200).json({message: "Cart updated"})


    } catch (error) {
        return res.status(500).json("Error: " + error.message)
    }
}

cartController.deleteCart = async (req, res) => {
    try {
        const deleteCart = await cartModel.findByIdAndDelete(req.params.id);

        if(!deleteCart){
            return res.status(404).json({message: "Cart not found"})
        }
        return res.status(200).json({message: "Cart deleted"})

    } catch (error) {
        return res.status(500).json("Error: " + error.message)
    }
}

export default cartController;