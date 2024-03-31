import './addalbum.css'
import { useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'

const AddAlbum = ({ isOpen, ToggleActive }) => {

    const { VITE_URL } = import.meta.env;
    const [formData, setFormData] = useState({
        nombre:"",
        artista:"",
        precio:"",
        stock:"",
        imagen:null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    };

    const handleCreateAlbum = async () => {

        easyFetch({
            url:  `${VITE_URL}/inventario`,
            method: "POST",
            body: formData,
            callback: (data) => {
                console.log("creado con exito!", data)
            }
        })
    }


    return (<>
        <div className='AddAlbum'>
            <button onClick={ToggleActive}>cerrar</button>

            <form encType="multipart/form-data">
                <div className='row'>
                    <label htmlFor="nombre">Disco:</label>
                    <input type="text" name="nombre" id="nombre" value={formData.nombre} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="artista">Artista:</label>
                    <input type="text" name="artista" id="artista" value={formData.artista} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" name="precio" id="precio" value={formData.precio} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="stock">Stock:</label>
                    <input type="text" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="imagen">Imagen:</label>
                    <input type="file" name="imagen" id="imagen"  onChange={handleImageChange} />
                </div>

            </form>

            <button onClick={handleCreateAlbum}>Añadir producto</button>


        </div>

    </>)
}

export default AddAlbum