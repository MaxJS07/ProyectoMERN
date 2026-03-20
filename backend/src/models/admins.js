import {Schema, model} from "mongoose"

const adminSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    isVerified:{
        type: Boolean
    }
}, {
    timestamps:true,
    strict: true
})

export default model("Admins", adminSchema)