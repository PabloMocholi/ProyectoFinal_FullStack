import connection from '../db/mongo.db.js'
import bcrypt from 'bcrypt'
import { Usuario } from '../db/schemas.js'


const responseApi = {
    data: [],
    msg: "",
    status: "ok"
}

export const getUser = async (req, res) => {

    try {
        console.log("ver usuario")
        console.log("Cuerpo del login", req.body)

        const { user, pass } = req.body

        const usuarioLogin = await Usuario.find({ nombre: user })
        console.log(usuarioLogin)

        let passCorrect = bcrypt.compareSync(pass, usuarioLogin[0].password)

        if (passCorrect) {
            const results = await Usuario.find({ nombre: user })
            console.log(results)
            res.status(200).json(results)

        } else {
            res.status(404).json("Incorrecto")
        }



    } catch (error) {
        res.status(500).json(error)
    }


}

export const registerUser = async (req, res) => {

    try {
        console.log("INSERT USER")
        const { user, pass } = req.body
        console.log("Cuerpo del registro", req.body)

        let passEncrypted = bcrypt.hashSync(pass, 10)

        const nuevoUser = new Usuario({

            nombre: user,
            password: passEncrypted,
            is_admin: false

        })

        await nuevoUser.save();

        res.status(200).send(nuevoUser);

    } catch (error) {
        res.status(500).json(error)
    }






}
