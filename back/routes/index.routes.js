/**---------------------------------------- 
 * Ruta principal de la API
 * 
 * Relacionar cada ruta con su controlador
 * 
 * @middlewares {multer}
 * 
 * @controller {albumes.controller, carrito.controller, login.controller, perfil.controller, usuarios.controller}
 * 
 * @endpoint {GET} /albumes  --> muestra todos los albumes de la BBD
 * @endpoint {POST} /getUser  --> consulta si el usuario existe y lo devuelve
 * @endpoint {POST} /registerUser  --> registra un nuevo usuario en la BBDD
 * @endpoint {PUT} /inventario:id  --> actualiza la información de un album
 * @endpoint {POST} /inventario  --> añade un nuevo album a la BBDD
 * @endpoint {DELETE} /inventario:id  --> elimina un album de la BBDD
 * @endpoint {POST} /carrito  --> registra la compra 
 * @endpoint {GET} /perfil/:id  --> obtiene los datos del perfil y sus compras
 * @endpoint {PUT} /perfil:id  --> actualiza los datos del perfil
 * @endpoint {GET} /usuarios  --> mustra todos los usuarios registrados
 * 
--------------------------------------------*/


import { Router } from "express";
import {  actualizarAlbum, deleteAlbum, getAllAlbumes, newAlbum} from "../controllers/albumes.controller.js";
import { getUser, registerUser } from "../controllers/login.controller.js";
import { addCompra } from "../controllers/carrito.controller.js";
import multer from 'multer';
import { getPerfil, updatePerfil } from "../controllers/perfil.controller.js";
import { getUsuarios } from "../controllers/usuarios.controller.js";
import { DIR_PUBLIC } from "../config/config.js";



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR_PUBLIC)
    },
    filename: function (req, file, cb) {
      cb(null, `${file.originalname}`)
    }
})
  
const upload = multer({ storage })

const router = Router();

router.get("/albumes", getAllAlbumes)
router.post("/login", getUser )
router.post("/register", registerUser)
router.put("/inventario/:id", upload.single('imagen'), actualizarAlbum)
router.post("/inventario", upload.single('imagen'), newAlbum)
router.delete("/inventario/:id", deleteAlbum)
router.post("/carrito", addCompra)
router.get("/perfil/:id", getPerfil)
router.put("/perfil/:id", updatePerfil)
router.get("/usuarios", getUsuarios)



export default router