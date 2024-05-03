import { useEffect, useState } from 'react'
import './elemento.css'
import { easyFetch } from './../../../helpers/utils.js'


/**
 * 
 * Componente que muestra los elementos del inventario
 * @hook {useState} recoge los datos del formulario
 * @hook {useState} indica si se debe mostrar el modal tras actualizar un elemento
 * @hook {useState} indica si se debe mostrar el modal para confirmar la eliminación de un elemento
 * @hook {useState} recoge el texto que debe mostrar el modal dependiendo de su función
 * @hook {useState} compruenba si se ha actualizado algún input del formulario
 * @prop {Object} datos información relativa al album {_id, nombre, imagen, artista, precio,stock}
 * @prop {Function} cargaInventario función que realiza el fetch a la API de los albumes
 * 
 */

const Elemento = ({ datos, cargaInventario }) => {

    const { _id, nombre, imagen, stock, artista, precio } = datos
    const { VITE_URL } = import.meta.env;
    const { VITE_URL_IMGS } = import.meta.env;
    const [formData, setFormData] = useState(datos)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
    const [modalText, setModalText] = useState("")
    const [cambio, setCambio] = useState(false)

    /**
     * 
     *  Función que muestra u oculta el modal que confirma la actualización de un elemento
     *  
     *  @param {String} texto texto que debe mostrar el modal
     */
    const ToggleModal = (texto) => {
        console.log("MODAL")
        setModalText(texto);
        setModalOpen(!modalOpen);
    }

     /**
     * 
     *  Función que muestra u oculta el modal previo a eliminar un elemento
     *  
     *  @param {String} texto texto que debe mostrar el modal
     */
    const ToggleDeleteModal = (texto) => {
        setModalDeleteOpen(!modalDeleteOpen);
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

    /**
    * 
    *  Función que se encarga de actualizar la imagen del formulario
    *  
    *  @param {event} e evento que se produce
    */
    const handleImageChange = (e) => {
        setCambio(true)
        const file = e.target.files[0];
        setFormData({ ...formData, imagen: file });
    };

    /**
     * Función que se encarga de subir los cambios a la BBDD
     * 
     *   No uso el easyFetch que se utiliza en el resto del proyecto ya que daba problemas
     *   a la hora de mandar una imagen
     *  
     */
    const handleUpdateAlbum = () => {

        console.log(formData)
        setCambio(false)
        const newformData = new FormData();
        newformData.append('nombre', formData.nombre);
        newformData.append('artista', formData.artista);
        newformData.append('precio', formData.precio);
        newformData.append('stock', formData.stock);
        newformData.append('imagen', formData.imagen);//IMCOMPATIBLE EN VERCEL
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
                console.log(" actualizado cn exito!", data)
                ToggleModal("Inventario actualizado")
                cargaInventario()
            })

    }

    /**
     * Función que se encarga de eliminar un album de la BBDD
     */
    const handleDeleteAlbum = () => {

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
            {/** div que muestra la información del album */}
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
                            <input type="number" name="precio" id="precio" value={formData.precio} onChange={handleInputChange} />
                        </div>
                        <div className='row'>
                            <label htmlFor="stock">Stock:</label>
                            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleInputChange} />
                        </div>
                        <div className='row'>
                            <label htmlFor="imagen">Nueva imagen:</label>
                            <input type="file" name="imagen" id="imagen" onChange={handleImageChange} />
                        </div>

                    </form>
                </div>
                {/** Botón que permite actualizar la información del album si se ha detectado algún cambio en los inputs */}
                <button className={` ${!cambio? 'disabled': 'update'}`} onClick={handleUpdateAlbum} disabled={!cambio}>actualizar</button>
                <button className='delete' onClick={ToggleDeleteModal}>eliminar</button>
            </div>


        </div>

        {/** modal que confirma que la actualización se ha producido */}
        <div className={`Modal ${modalOpen ? 'is_shown' : ''}`}>
            <span>{modalText}</span>
            <button onClick={() => ToggleModal("Inventario actualizado")}>cerrar</button>
        </div>
        {/** modal que avisa de que un album va a ser eliminado definitivamente y permite completar la acción */}
        <div className={`Modal ${modalDeleteOpen ? 'is_shown' : ''}`}>
            <span>¡Estás a punto de eliminar un elemento de forma permanente!</span>
            <div className='Modal-botones'>
                <button onClick={() => ToggleDeleteModal("")}>Cerrar</button>
                <button className='delete--button' onClick={handleDeleteAlbum}>Eliminar</button>
            </div>

        </div>


    </>)
}

export default Elemento