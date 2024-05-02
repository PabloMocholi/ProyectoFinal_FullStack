import './addalbum.css'
import { useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'


/**
 * 
 * Componente que muestra el formulario para añadir un nuevo album a la BBDD
 * @hook {useState} recoge los datos del formulario
 * @prop {Boolean} isOPen indica si se debe visualizar el formulario
 * @prop {Function} ToggleActive función que modifica el estado de isOpen
 * @prop {Function} cargaInventario función que vuelve a traer datos de la API
 * 
 */

const AddAlbum = ({ isOpen, ToggleActive, cargaInventario }) => {

    //API a la que se realiza el request
    const { VITE_URL } = import.meta.env;

    const [formData, setFormData] = useState({
        nombre: "",
        artista: "",
        precio: "",
        stock: "",
        imagen: null
    })

    /**
    * 
    *  Función que se encarga de mantener las variables del form actualizadas
    *  
    *  @param {event} e evento que se produce
    */
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    /**
    * 
    *  Función que se encarga de actualizar la imagen del formulario
    *  
    *  @param {event} e evento que se produce
    */
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    };

    /**
    * 
    *  Función que se encarga de añadir el nuevo album a la BBDD
    * 
    *   No uso el easyFetch que se utiliza en el resto del proyecto ya que daba problemas
    *   a la hora de mandar una imagen
    *  
    *  @param {event} e evento que se produce
    */
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
       {/** Formulario de creación de un album */}
        <div className='AddAlbum'>
            <h2>Datos del nuevo album:</h2>
            <button className='close' onClick={ToggleActive}>X</button>

            <form onSubmit={handleCreateAlbum}>
                <div className='row'>
                    <label htmlFor="nombre">Disco:</label>
                    <input type="text" name="nombre" id="nombre" required value={formData.nombre} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="artista">Artista:</label>
                    <input type="text" name="artista" id="artista" required value={formData.artista} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="precio">Precio:</label>
                    <input type="number" name="precio" id="precio" required value={formData.precio} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="stock">Stock:</label>
                    <input type="number" name="stock" id="stock" required value={formData.stock} onChange={handleInputChange} />
                </div>

                <div className='row'>
                    <label htmlFor="imagen">Imagen:</label>
                    <input type="file" name="imagen" id="imagen" onChange={handleImageChange} />
                </div>
                <input type="submit" value="Añadir album" />

            </form>

        </div>

    </>)
}

export default AddAlbum