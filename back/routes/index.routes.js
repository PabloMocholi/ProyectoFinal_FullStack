import { Router } from "express";
import {  actualizarAlbum, getAllAlbumes, newAlbum} from "../controllers/albumes.controller.js";
import { getUser, registerUser } from "../controllers/login.controller.js";

import multer from 'multer';

const upload = multer({ dest: 'uploads/' });


const router = Router();
router.get("/albumes", getAllAlbumes)
router.post("/login", getUser )
router.post("/register", registerUser)

router.put("/inventario/:id",actualizarAlbum)
router.post("/inventario", upload.single('imagen'), newAlbum)

/*

router.get("/albumes/:id", getAlbumById)
router.post("/albumes", addNewAlbum)
router.update("/albumes/:id", updateAlbum)
router.delete("/albumes/:id", deleteAlbum)

router.get("/canciones/:id", getAllCancionesByAlbum)
router.get("/cancion//:id", getCancionById)
router.post("/canciones/:id", addCancionToAlbum)
router.update("/canciones/:id", updateCancion)
router.delete("/canciones/:id", deleteCancion)



router.post("/register",registerUser )*/


export default router