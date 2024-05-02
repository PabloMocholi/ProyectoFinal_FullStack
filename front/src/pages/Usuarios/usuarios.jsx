import { useState, useEffect } from "react"
import { easyFetch } from "../../../helpers/utils"
import './usuarios.css'


/**
 * 
 * Componente que muestra una lista de los usuarios registrados en la aplicación
 * @hook {useState} contiene el listado de usuarios
 * @hook {useEffect} realiza la petición de datos a la API cuando se renderiza el componente
 */

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])

    const { VITE_URL } = import.meta.env;

    /**
     * Función que realiza el fetch a la API
     */
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

        {/** listado de usuarios registrados en la aplicación */}
        <div className="ListaTarjetasUsuario">
            {
                usuarios && usuarios.map((usuario) => {
                    return (<>
                    {/** adapta la tarjeta según el rol */}
                        <div className={`TarjetaUsuario ${usuario.is_admin ? "": "cliente"}`}>
                            <div className="TarjetaUsuario-row">
                                <span><b>Nombre del usuario:</b> </span>
                                <span>{usuario.nombre}</span>
                            </div>
                            <div className="TarjetaUsuario-row">
                                {/** muestra el rol del usuario */}
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