import { useEffect, useState, useContext } from "react"
import { easyFetch } from "../../../helpers/utils"
import { LoginContext } from "../../components/layout";
import './perfil.css'

const Perfil = () => {

    const { userData } = useContext(LoginContext);
    const { VITE_URL } = import.meta.env;
    const { VITE_URL_IMGS } = import.meta.env;

    const [compras, setCompras] = useState([])
    const [usuario, setUsuario] = useState([])
    const [formData, setFormData] = useState([])


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

    const handleUpdatePerfil = () => {
        easyFetch({
            url: `${VITE_URL}/perfil/${userData.id}`,
            method: "PUT",
            body: formData,
            callback: (data) => {
                console.log(" actualizo datos", data)


            }
        })
    }


    useEffect(() => {
        cargarPerfil()
    }, [])

    const adaptarFecha = (fecha) => {

        const nuevaFecha = new Date(fecha);

        return (`${nuevaFecha.getDate()}/${nuevaFecha.getMonth() + 1}/${nuevaFecha.getFullYear()}-${nuevaFecha.getUTCHours()}:${nuevaFecha.getUTCMinutes()}`)

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (<>
        <div className="Perfil">
            <div className="Usuario">

                {
                    usuario && <>
                        <form className="FormPerfil">
                            <h2 className="Tit">TUS DATOS:</h2>
                            <div className="FormPerfil-row">
                                <label htmlFor="nombre">Nombre de usuario:</label>
                                <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} id="nombre" />

                            </div>
                            <div className="FormPerfil-row">
                                <label htmlFor="email">Email:</label>
                                <input type="text" name="email" value={formData.email} onChange={handleInputChange} id="email" />
                            </div>
                            <div className="FormPerfil-row">
                                <label htmlFor="telefono">Teléfono:</label>
                                <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} id="telefono" />
                            </div>
                            <div className="FormPerfil-row">
                                <label htmlFor="direccion">Dirección:</label>
                                <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} id="direccion" />
                            </div>
                            <div className="FormPerfil-row">
                                <label htmlFor="ciudad">Ciudad:</label>
                                <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} id="ciudad" />
                            </div>
                        </form>
                        <button onClick={handleUpdatePerfil}>Actualizar perfil</button>


                    </>
                }
            </div>
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
        </div>
    </>)
}

export default Perfil