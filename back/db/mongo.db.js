import mongoose from 'mongoose'
import { DB_DB, DB_PASS, DB_USER } from '../config/config.js'


const connection = async () => {
    console.log("estableciendo conexion")
    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cei-pablo.3f5vxzt.mongodb.net/${DB_DB}`
    console.log(url)

    await mongoose.connect(url)
        .then(console.log("conectado a MongoDB - ATLAS"))
        .catch(e => console.log("error en la conezxion ", e))
    
}



export default connection