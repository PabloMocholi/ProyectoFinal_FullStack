import { Router } from "express";
import { addNewAlbum, deleteAlbum, getAlbumById, getAllAlbumes, updateAlbum } from "../controllers/albumes.controller";
import { addCancionToAlbum, deleteCancion, getAllCancionesByAlbum, getCancionById, updateCancion } from "../controllers/canciones.controller";
import { getUser, registerUser } from "../controllers/login.controller";


const router = Router();


router.get("/albumes", getAllAlbumes)
router.get("/albumes/:id", getAlbumById)
router.post("/albumes", addNewAlbum)
router.update("/albumes/:id", updateAlbum)
router.delete("/albumes/:id", deleteAlbum)

router.get("/canciones/:id", getAllCancionesByAlbum)
router.get("/cancion//:id", getCancionById)
router.post("/canciones/:id", addCancionToAlbum)
router.update("/canciones/:id", updateCancion)
router.delete("/canciones/:id", deleteCancion)


router.get("/login", getUser )
router.post("/register",registerUser )


export default router