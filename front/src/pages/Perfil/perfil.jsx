import { useEffect, useState, useContext } from "react"
import { easyFetch } from "../../../helpers/utils"
import { LoginContext } from "../../components/layout";
import './perfil.css'



/**
 * 
 * Componente que muestra el perfil del usuario logeado
 * @hook {useContext} contiene la información del usuario logeado
 * @hook {useState} contiene la información de las compras realizadas por el usuario
 * @hook {useState} contiene la información del usuario
 * @hook {useState} contiene la información del usuario y se actualiza con el form
 * @hook {useState} indica si se debe mostrar el modal de usuario actualizado
 * @hook {useState} indica si se ha producido un cambio en algun input del form del usuario
 * @hook {useEffect} realiza la petición de datos a la API cuando se renderiza el componente
 */

const Perfil = () => {

    const { userData } = useContext(LoginContext);
    const { VITE_URL } = import.meta.env;
    const { VITE_URL_IMGS } = import.meta.env;
    const [compras, setCompras] = useState([])
    const [usuario, setUsuario] = useState([])
    const [formData, setFormData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [cambio, setCambio] = useState(false)

    /**
     * Función que muestra u oculta el modal tras actualizar un usuario
     */
    const ToggleModal = () => {
        setModalOpen(!modalOpen);
    }

    /**
     * Función que hace la petición de datos del usuario y sus compra a la API
     */
    const cargarPerfil = () => {
        easyFetch({
            url: `${VITE_URL}/perfil/${userData.id}`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setCompras(data.dataCompra)
                setUsuario(data.dataUser[0])
                setFormData(data.dataUser[0])
                console.log(data.dataCompra)
            }
        })
    }

    /**
     * Función que actualiza las entradas del perfil de usuario en la BBDD
     */
    const handleUpdatePerfil = () => {
        easyFetch({
            url: `${VITE_URL}/perfil/${userData.id}`,
            method: "PUT",
            body: formData,
            callback: (data) => {
                console.log(" actualizo datos", data)
                setCambio(false)
                ToggleModal()


            }
        })
    }


    useEffect(() => {
        cargarPerfil()
    }, [])

    /**
    * 
    *  Función que se encarga de darle un formato especifico a la fecha
    *   dia/mes/año - hora:minutos
    *  
    *  @param {Date} fecha fecha a formatear
    */
    const adaptarFecha = (fecha) => {

        const nuevaFecha = new Date(fecha);

        return (`${nuevaFecha.getDate()}/${nuevaFecha.getMonth() + 1}/${nuevaFecha.getFullYear()}-${nuevaFecha.getUTCHours()}:${nuevaFecha.getUTCMinutes()}`)

    }

    /**
    * 
    *  Función que se encarga de mantener las variables del form actualizadas
    *  
    *  @param {event} e evento que se produce
    */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCambio(true)
        setFormData({ ...formData, [name]: value })
    }

    return (<>
        <div className="Perfil">
            {/** Apartado de información de usuario */}
            <div className="Usuario">

                {
                    usuario && <>
                        <form className="FormPerfil">
                            <h2 className="Tit">TUS DATOS:</h2>
                            <div className="FormPerfil-row">
                                <label className="FormPerfil-label" htmlFor="nombre">Nombre de usuario:</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} id="nombre" />

                            </div>
                            <div className="FormPerfil-row">
                                <label className="FormPerfil-label" htmlFor="email">Email:</label>
                                <input type="text" name="email" value={formData.email} onChange={handleInputChange} id="email" />
                            </div>
                            <div className="FormPerfil-row">
                                <label className="FormPerfil-label" htmlFor="telefono">Teléfono:</label>
                                <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} id="telefono" />
                            </div>
                            <div className="FormPerfil-row">
                                <label className="FormPerfil-label" htmlFor="direccion">Dirección:</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} id="direccion" />
                            </div>
                            <div className="FormPerfil-row">
                                <label className="FormPerfil-label" htmlFor="ciudad">Ciudad:</label>
                                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} id="ciudad" />
                            </div>
                        </form>
                        {/** botón que permite la actualización de la información si se ha detectado algún cambio */}
                        <button className={` ${!cambio? 'disabled': 'update'}`} onClick={handleUpdatePerfil} disabled={!cambio}>Actualizar perfil</button>


                    </>
                }
            </div>
            {/** Apartado con el histórico de compras del usuario */}
            <div className="Compras">
                <h2 className="Tit">TUS COMPRAS:</h2>
                {
                    compras && compras.map((compra) => {
                        return (<>
                            <div className="Compra">
                                <div>
                                    <span className="Compra-dato">ID: </span>
                                    <span>{compra._id}</span>
                                </div>
                                <div>
                                    <span className="Compra-dato">Total:</span>
                                    <span> {compra.precio}€</span>
                                </div>

                                <div className="Compra-imgs">
                                    {
                                        compra.albumes.map((album) => {
                                            return (<>
                                                {/** muestra la imagen junto a la cantidad de albumes comorados */}
                                                <div className="Compra-img">
                                                    <img className="Compra-imgC" src={`${VITE_URL_IMGS}${album.imagen}`} alt="" />
                                                    <span className="Compra-cantidad">X{album.cantidad}</span>
                                                </div>
                                            </>)
                                        })
                                    }
                                </div>

                                <span> {adaptarFecha(compra.fecha_compra)}</span>
                            </div>


                        </>)
                    })
                }
            </div>
            {/** Modal de confirmación */}
            <div className={`Modal ${modalOpen ? 'is_shown' : ''}`}>
                <span>Usuario actualizado</span>
                <button onClick={ToggleModal}>cerrar</button>
            </div>
        </div>
    </>)
}

export default Perfil