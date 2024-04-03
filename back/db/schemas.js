import mongoose from "mongoose"
import { Schema } from "mongoose"

const options = {
    collection: "albumes",

}
const albumesSchema = new mongoose.Schema({

    nombre: String,
    imagen: String,
    stock: Number,
    artista:String,
    precio: Number,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }

    
}, options)


export const Album = mongoose.model("Album", albumesSchema)

//---------


const options2 = {
    collection: "usuarios",

}
const usuariosSchema = new mongoose.Schema({

    nombre: String,
    password: String,
    is_admin: Boolean

    
}, options2)


export const Usuario = mongoose.model("Usuario", usuariosSchema)


//---------

const options3 = {
    collection: "compras",

}
const comprasSchema = new mongoose.Schema({

    usuario: { type: Schema.Types.ObjectId, 
        ref: 'Usuario' },
    albumes: Array,
    precio: Number,
    fecha_compra:  {
        type: Date,
        default: Date.now
    }

    
}, options3)


export const Compra = mongoose.model("Compra", comprasSchema)
