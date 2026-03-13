import app from "./app.js"
import "./database.js"
import {config} from "./src/config.js"

//Creamos la función
//que se encarga de ejecutar el servidor
async function main() {
    app.listen(config.server.PORT);
    console.log("server on port:" + config.server.PORT)
}

main();