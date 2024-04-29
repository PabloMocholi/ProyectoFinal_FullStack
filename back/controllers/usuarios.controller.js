/**---------------------------------------- 
 * @controller {usuarios.controller}
 * 
 * Controlador para obtener la información de todos los usuarios
 * 
 *  @endpoint {GET} /usuarios  --> mustra todos los usuarios registrados
 * 
--------------------------------------------*/



import { Usuario, Album, Compra } from "../db/schemas.js";

const responseApi = {
    data: [],
    msg: "",
    status: "ok"
}


export const getUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find()

        console.log(usuarios)

        responseApi.data = usuarios
        responseApi.msg = "Datos de todos los perfiles obtenidos"
        res.status(200).json(responseApi)

    } catch (error) {
        res.status(500).json(error)
    }


}
