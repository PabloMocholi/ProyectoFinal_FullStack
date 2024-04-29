/**---------------------------------------- 
 * @controller {perfil.controller}
 * 
 * Controladores para la gestión de la información de un perfil
 * 
 * @endpoint {GET} /perfil/:id  --> obtiene los datos del perfil y sus compras
 * @endpoint {PUT} /perfil:id  --> actualiza los datos del perfil
 * 
--------------------------------------------*/


import { Usuario, Album, Compra } from "../db/schemas.js";

const responseApi = {
    dataUser: [],
    dataCompra: [],
    msg: "",
    status: "ok"
}

export const getPerfil = async (req, res) => {

    try {

        const { id } = req.params
        // console.log(id)

        const usuarioLogin = await Usuario.find({ _id: id })
        console.log(usuarioLogin)

        const comprasUsuario = await Compra.find({ usuario: id })
        console.log(comprasUsuario)
        responseApi.dataUser = usuarioLogin
        responseApi.dataCompra = comprasUsuario
        responseApi.msg = "Datos de perfil obtenidos"
        res.status(200).json(responseApi)




    } catch (error) {
        res.status(500).json(error)
    }


}


export const updatePerfil = async (req, res) => {

    try {
        //console.log(req.body)
        const { _id, nombre, direccion, ciudad, telefono, email } = req.body

        const usuarioEdtidado = await Usuario.findByIdAndUpdate(_id,
            {
                nombre: nombre,
                direccion: direccion,
                ciudad: ciudad,
                telefono: telefono,
                email: email
            },
            { new: true })

        console.log(usuarioEdtidado)

        responseApi.dataUser = usuarioEdtidado;
        responseApi.msg = "usuario editado correctamente"
        
        res.status(200).json(responseApi)

    } catch (error) {
        res.status(500).json(error)
    }

}