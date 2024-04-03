import './addalbum.css'
import { useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'

const AddAlbum = ({ isOpen, ToggleActive, cargaInventario }) => {

    const { VITE_URL } = import.meta.env;
    const [formData, setFormData] = useState({
        nombre: "",
        artista: "",
        precio: "",
        stock: "",
        imagen: null
    }) 
     const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    }; 

    const handleCreateAlbum = (e) => {
        console.log("ENTRO")
        e.preventDefault()

        const newformData = new FormData();

        newformData.append('nombre', formData.nombre);
        newformData.append('artista', formData.artista);
        newformData.append('precio', formData.precio);
        newformData.append('stock', formData.stock);
        newformData.append('imagen', formData.imagen);
        
        console.log(newformData);


        fetch(`${VITE_URL}/inventario`, {
            method: 'POST',
            body: newformData
        }).then(response => response.json())
            .then(data => {
                console.log("creado con exito!", data);
                ToggleActive()
                cargaInventario()
            })
    };




    return (<>
        <div className='AddAlbum'>
            <button className='close' onClick={ToggleActive}>X</button>

            <form  onSubmit={handleCreateAlbum}>
                <div className='row'>
                    <label htmlFor="nombre">Disco:</label>
                    <input type="text" name="nombre" id="nombre"  value={formData.nombre} onChange={handleInputChange}   />
                </div>

                <div className='row'>
                    <label htmlFor="artista">Artista:</label>
                    <input type="text" name="artista" id="artista"  value={formData.artista} onChange={handleInputChange}   />
                </div>

                <div className='row'>
                    <label htmlFor="precio">Precio:</label>
                    <input type="text" name="precio" id="precio" value={formData.precio} onChange={handleInputChange}   />
                </div>

                <div className='row'>
                    <label htmlFor="stock">Stock:</label>
                    <input type="text" name="stock" id="stock" value={formData.stock} onChange={handleInputChange}   />
                </div>

                <div className='row'>
                    <label htmlFor="imagen">Imagen:</label>
                    <input type="file" name="imagen" id="imagen"  onChange={handleImageChange}  />
                </div>
                <input type="submit" value="Añadir album" />

            </form>




        </div>

    </>)
}

export default AddAlbum