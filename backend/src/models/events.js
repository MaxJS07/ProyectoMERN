import {model, Schema} from "mongoose"

const eventModel = new Schema({
    customerName:{
        type: String
    },
    cantProducts:{
        type: Number
    },
    eventDate:{
        type: Date
    }
}, {
    timestamps: true,
    strict: false
})

export default model("events", eventModel);