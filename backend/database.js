import mongoose from "mongoose";
import { config } from "./src/config.js"

mongoose.connect(config.db.URI)

//Comprobar que todo funciona
const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("DB IS CONNECTED");
})
connection.on("disconnected", ()=>{
    console.log("DB IS DISCONNECTED")
})
connection.on("error", (error)=> {
    console.log("ERROR FOUND" + error)
})