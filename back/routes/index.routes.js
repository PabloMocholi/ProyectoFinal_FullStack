import { Router } from "express";
import {  actualizarAlbum, deleteAlbum, getAllAlbumes, newAlbum} from "../controllers/albumes.controller.js";
import { getUser, registerUser } from "../controllers/login.controller.js";
import { addCompra } from "../controllers/carrito.controller.js";
import multer from 'multer';



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
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



export default router