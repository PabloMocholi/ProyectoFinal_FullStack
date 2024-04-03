import { response } from "express"
import { Album } from "../db/schemas.js"
import multer from 'multer'

const responseApi = {
    data: [],
    msg: "",
    status: "ok"
}

export const getAllAlbumes = async (req, res) => {

    try {

        const results = await Album.find()
        responseApi.data = results
        responseApi.msg = "Albumes leidos correctamente"

        res.status(200).json(responseApi)

    } catch (error) {
        res.status(500).json(error)
    }
}


export const actualizarAlbum = async (req, res) => {


    try {
        const { nombre, artista, precio, stock } = req.body
        const { id } = req.params
        let albumEditado

        if (req.file) {
            albumEditado = await Album.findByIdAndUpdate(id,
                {
                    nombre: nombre,
                    artista: artista,
                    precio: precio,
                    stock: stock,
                    imagen: req.file.originalname,
                    updated_at: Date.now()
                },
                { new: true })

        } else {
            albumEditado = await Album.findByIdAndUpdate(id,
                {
                    nombre: nombre,
                    artista: artista,
                    precio: precio,
                    stock: stock,
                    updated_at: Date.now()
                },
                { new: true })
        }

        //console.log(albumEditado)

        responseApi.data = albumEditado
        responseApi.msg = "Album actualizado"

        res.status(200).json(responseApi)


    } catch (error) {
        res.status(500).json(error)
    }

}


export const newAlbum = async (req, res) => {
    console.log("Añado album")
    console.log("body", req.body)
    console.log(req.file)

    const { nombre, artista, precio, stock } = req.body
    const imagen = req.file.originalname;

    const nuevoAlbum = new Album({

        nombre,
        artista,
        imagen,
        stock,
        precio,
        created_at: Date.now()
    })

    await nuevoAlbum.save();

    responseApi.data = nuevoAlbum;
    responseApi.msg = "creado album"
    responseApi.status = 200

    res.status(200).json(responseApi)
};

export const deleteAlbum= async (req, res) => {

    const {id} = req.params

    const albumEliminado = await Album.findByIdAndDelete(id)

    responseApi.data = albumEliminado
    responseApi.msg = "album eliminado"
    responseApi.status = 200

    res.status(200).json(responseApi)
   
};

