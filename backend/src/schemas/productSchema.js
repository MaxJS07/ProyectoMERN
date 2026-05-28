import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    quantity:{
        type: Number
    },
    subtotal:{
        type: Number
    }
})

export default productSchema;