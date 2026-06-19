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
    },
    loginAttempts:{
        type: Number
    },
    timeOut:{
        type: Date
    }
}, {
    timestamps:true,
    strict: true
})

export default model("Admins", adminSchema)