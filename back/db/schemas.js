/**
 *  Modelos de la API
 * 
 * @models {Object} Album, Usuario, Compra
 * @odem {mongoose}
 * 
 */


import mongoose from "mongoose"
import { Schema } from "mongoose"

/**
 * Modelo de Album
 * 
 * Este modelo define la estructura de los registros de albumes en la BBD
 * 
 * @model Album
 * @property {String}  nombre - nombre del album
 * @property {String}  imagen - nombre de la imagen asociada al album
 * @property {Number}  stock - numero de unidades disponibles
 * @property {String}  artista - nombre de cantante/grupo 
 * @property {Number}  precio - precio del album
 * @property {Date}  created_at - fecha de creacion
 * @property {Date}  updated_at - fecha de actualización
 * @property {Date}  deleted - fecha de borrado
 * 
 */

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



/**
 * Modelo de Usuario
 * 
 * Este modelo define la estructura de los registros de usuarios en la BBD
 * 
 * @model Usuario
 * @property {String}  nombre - nombre del usuario
 * @property {String}  password - contraseña
 * @property {Boolean}  is_admin - indica el rol del usuario
 * @property {String}  direccion - direccion de residencia
 * @property {String}  ciudad - ciudad donde vive el usuario
 * @property {String}  telefono - numero de telefono del usuario
 * @property {String}  email - direccion de email del usuarip
 * 
 */


const options2 = {
    collection: "usuarios",

}
const usuariosSchema = new mongoose.Schema({

    nombre: String,
    password: String,
    is_admin: Boolean,
    direccion: String,
    ciudad: String,
    telefono : String,
    email: String,

    
}, options2)


export const Usuario = mongoose.model("Usuario", usuariosSchema)



/**
 * Modelo de Compra
 * 
 * Este modelo define la estructura de los registros de compras en la BBD
 * 
 * @model Compra
 * @property {Schema.Types.ObjectId}  usuario - id del usuario que realizó la compra
 * @property {Array}  albumes - lista de albumes comprados
 * @property {Number}  precio - precio total de la compra
 * @property {Date}  fecha_compra - fecha de registro de la compra
 * 
 */


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
