import { Album, Compra } from "../db/schemas.js";

const responseApi = {
    data: [],
    msg: "",
    status: "ok"
}


export const addCompra = async (req, res) => {

    try {

        console.log(req.body)
        const idUser = req.body[0].id
        const albumes = req.body[1]
        const precio = req.body[2]

        const nuevaCompra = new Compra({

            usuario: idUser,
            albumes,
            precio,
            fecha: Date.now()
        })

        const albumesActualizados = albumes.map(async (album) => {
            const newAlbum = await Album.findByIdAndUpdate(album._id,
                {
                    stock: album.stock - album.cantidad
                },
                { new: true })
            console.log(newAlbum)
        })
        await Promise.all(albumesActualizados);

        await nuevaCompra.save();

        responseApi.data = nuevaCompra;
        responseApi.msg = "registrada compra"
        responseApi.status = 200


        res.status(200).json(responseApi)

    } catch (error) {
        res.status(500).json(error)
    }




}