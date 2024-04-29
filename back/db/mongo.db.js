/**
 * Función encargada de conectar con la BBDD de Mongo
 */

import mongoose from 'mongoose'
import { DB_MONGO } from '../config/config.js'


const connection = async () => {
    console.log("estableciendo conexion")
    // const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cei-pablo.3f5vxzt.mongodb.net/${DB_DB}`

    //console.log(DB_MONGO)
    // console.log(url)
    //const url = DB_MONGO

    await mongoose.connect(DB_MONGO)
        .then(console.log("conectado a MongoDB - ATLAS"))
        .catch(e => console.log("error en la conezxion ", e))

}



export default connection