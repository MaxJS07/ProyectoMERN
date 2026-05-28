import mongoose, {Schema, model} from "mongoose";
import productSchema from "../schemas/productSchema.js";

/*
Campos:
    customerId,
    products:
        productId
        quantity
        subtotal
    total
    status
*/

const cartModel = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers"
    },
    products: {
        type: [productSchema]
    },
    total:{
        type: Number
    },
    status:{
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Carts", cartModel);