import { useState, useEffect } from "react"
import { easyFetch } from "../../../helpers/utils"
import './usuarios.css'

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])

    const { VITE_URL } = import.meta.env;

    const cargarUsuarios = () => {
        easyFetch({
            url: `${VITE_URL}/usuarios`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setUsuarios(data.data)
            }
        })
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])


    return (<>

        <div className="ListaTarjetasUsuario">
            {
                usuarios && usuarios.map((usuario) => {
                    return (<>
                        <div className={`TarjetaUsuario ${usuario.is_admin ? "": "cliente"}`}>
                            <div className="TarjetaUsuario-row">
                                <span><b>Nombre del usuario:</b> </span>
                                <span>{usuario.nombre}</span>
                            </div>
                            <div className="TarjetaUsuario-row">
                                <span > <b>Rol del usuario: </b></span>
                                {
                                    usuario.is_admin ? <span>ADMINISTRADOR</span> : <span>CLIENTE</span>
                                }
                            </div>
                          


                        </div>

                    </>)
                })
            }</div>


    </>)
}

export default Usuarios