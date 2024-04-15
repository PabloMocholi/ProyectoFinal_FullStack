import { useEffect, useState } from 'react'
import './elemento.css'
import { easyFetch } from './../../../helpers/utils.js'
const Elemento = ({ datos, cargaInventario }) => {

    const { _id, nombre, imagen, stock, artista, precio } = datos
    const { VITE_URL } = import.meta.env;
    const { VITE_URL_IMGS } = import.meta.env;

    const [formData, setFormData] = useState(datos)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    };

    const handleUpdateAlbum = () => {

        console.log(formData)
        const newformData = new FormData();

        newformData.append('nombre', formData.nombre);
        newformData.append('artista', formData.artista);
        newformData.append('precio', formData.precio);
        newformData.append('stock', formData.stock);
        newformData.append('imagen', formData.imagen);

        console.log(newformData)

        /*  easyFetch({
             url: `${VITE_URL}/inventario/${_id}`,
             method: "PUT",
             body: formData,
             callback: (data) => {
                 console.log(" actualizado cn exito!", data)
             }
         }) */

        fetch(`${VITE_URL}/inventario/${_id}`, {
            method: 'PUT',
            body: newformData
        }).then(response => response.json())
            .then(data => {
                //console.log(" actualizado cn exito!", data)
                cargaInventario() 
            })

    }

    const handleDeleteAlbum = ()=>{

        easyFetch({
        url: `${VITE_URL}/inventario/${_id}`,
        method: "DELETE",
        body: formData,
        callback: (data) => {
            console.log(" borrado cn exito!", data)
            cargaInventario()
        }
    }) 

    }

    return (<>
        <div className='elemento'>
            <img className='img' src={`${VITE_URL_IMGS}${imagen}`} alt="" />
            <div className='column'>
                <div className='column-data'>
                    <form>
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
                            <label htmlFor="imagen">Nueva imagen:</label>
                            <input type="file" name="imagen" id="imagen"  onChange={handleImageChange}  />
                        </div>

                    </form>
                </div>

                <button className='update' onClick={handleUpdateAlbum}>actualizar</button>
                <button className='delete' onClick={handleDeleteAlbum}>eliminar</button>
            </div>


        </div>
    </>)
}

export default Elemento