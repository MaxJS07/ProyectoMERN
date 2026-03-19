import mongoose, {Schema, model} from "mongoose";

const reviewSchema = new Schema({

    idEmployee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    },
    idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    rating:{
        type: Number
    },
    comment:{
        type: String
    }
}, {
    timestamps: true,
    strict: false
})

export default model("Reviews", reviewSchema);