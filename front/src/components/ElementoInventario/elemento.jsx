import { useEffect, useState } from 'react'
import './elemento.css'
import { easyFetch } from './../../../helpers/utils.js'
const Elemento = ({ datos }) => {

    const { _id, nombre, imagen, stock, artista, precio } = datos
    const { VITE_URL } = import.meta.env;
    
    const [formData, setFormData] = useState(datos)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleUpdateAlbum = async () => {
        easyFetch({
            url: `${VITE_URL}/inventario/${_id}`,
            method: "PUT",
            body: formData,
            callback: (data) => {
                console.log(" actualizado cn exito!", data)
            }
        })

    }

    return (<>
        <div className='elemento'>
            <img className='img' src={`./images/${imagen}`} alt="" />
            <div className='column'>
                <div className='column-data'>
                    <form>
                        <div className='row'>
                            <label htmlFor="nombre">Disco:</label>
                            <input type="text" name="nombre" id="nombre" value={formData.nombre}  onChange={handleInputChange} />
                        </div>

                    </form>
                </div>
             
                <button onClick={handleUpdateAlbum}>actualizar</button>
            </div>
  

        </div>
    </>)
}

export default Elemento