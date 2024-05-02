
import { useEffect, useState, createContext } from 'react'
import './index.css'
import { Album } from '../../components/Album'
import { easyFetch } from './../../../helpers/utils.js'
import Carrito from '../../components/Carrito/carrito.jsx';


/**
 * Contexto que contiene la información del carrito
 * 
 * @context
 * @property {Array} carrito lista con todos los productos en el carrito
 * @property {Function} setCarrito actualiza valores del carrito
 * @property {Fuction} addToCarrito comprueba si el elemento ya está en el carrito para aumentar cantidad o para añadirlo por 1ªvez
 * @components {Album, Carrito}
 */
export const carritoContext = createContext([]);



/**
 * 
 * Componente que muestra los albumes
 * @hook {useState} contiene los albumes obtenidos de la BBDD
 * @hook {useState} contiene la información del carrito
 * @hook {useState} indica si se debe mostrar el carrito
 * @hook {useState} indica si se debe mostrar el modal para indicar si ya no se pueden añadir más productos
 * @hook {useState} contiene el texto por el que filtra los albumes
 * @hook {useEffect} realiza la llamada a la API cuando de carga el componente
 */

export const Albumes = () => {

    const [albumes, setAlbumes] = useState([])
    const [carrito, setCarrito] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [buscador, setBuscador] = useState("")

    const { VITE_URL } = import.meta.env;

     /**
    * 
    *  Función que se encarga de actualizar lo que el usuario escribe en el buscador
    *  
    *  @param {event} e evento que se produce
    */
    const actualizoBuscador = (e) => {
        setBuscador(e.target.value);
    }

    /**
     * Función que mustra u oculta el modal de que no se pueden añadir más productos
     */
    const ToggleModal = () => {
        setModalOpen(!modalOpen);
    }

    /**
     * Función que muestra u oculta el componente del carrito
     */
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    /**
     * Función que realiza la petición a la API para traer los albumes
     */
    const cargarAlbumes = () => {
        easyFetch({
            url: `${VITE_URL}/albumes`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setAlbumes(data.data)
            }
        })
    }

    useEffect(() => {
        cargarAlbumes()
    }, [])

    /**
    * 
    *  Función que añade un album nuevo o aumenta la cantidad de uno ya presente
    *  
    *  @param {Obejct} album album a añadir
    */
    const addToCarrito = (album) => {

        console.log("Carrito", album)

        //busca si el album ya está presente en el array del carrito
        const index = carrito.findIndex(a => a._id === album._id);

        //encuentra el album
        if (index !== -1) {
            console.log("ya en carrito")
            //copia del array para poder modificarlo
            const nuevoCarrito = [...carrito];

            //comprueba si no supera el stock disponible
            if (nuevoCarrito[index].stock > nuevoCarrito[index].cantidad) {

                //aumenta la cantidad del elemento ya presente
                nuevoCarrito[index] = {
                    ...nuevoCarrito[index],
                    cantidad: nuevoCarrito[index].cantidad + 1
                };
                //actualiza el carrito
                setCarrito(nuevoCarrito)
            } else {
                //muestra el modal que indica que es imposible añadir más
                ToggleModal()
            }

        // no encuentra el album y lo añade directamente
        } else {
            setCarrito([...carrito, { ...album, cantidad: 1 }])

        }
    }

    // usa la función de filter para obtener los albumes cuyo nombre de album coincida con el del input del buscador
    const  albumesFiltrados = albumes.filter((album) => {

      return(album.nombre.toLowerCase().includes(buscador.toLowerCase()) )


    });


    return (<>

        <carritoContext.Provider value={{ carrito, setCarrito, addToCarrito }}>
            {/** botón para mostrar el carrito */}
            <button className='carritoBtn' onClick={ToggleActive}><i class="fa-solid fa-cart-shopping"></i></button>
            {/** input del buscador */}
            <input type="text" name="buscador" id="buscador" placeholder="Busca por nombre de disco..." onChange={actualizoBuscador} className='buscador' />
            <div className='Albumes'>
               
                {
                    albumes && albumesFiltrados.length > 0?
                    <>
                    {/**carga un componente Album por cada elemento filtrado */}
                    {albumesFiltrados.map(album => {
                        return (<>
                            <Album key={album._id} datos={album} />
                        </>)
                    })}</> : <span>No hay coincidencias</span>
                    }

            </div>{
                //componente de Carrito
                <Carrito isOpen={isOpen} ToggleActive={ToggleActive} cargarAlbumes={cargarAlbumes} />
            }

        </carritoContext.Provider>
        
        {/**Modal que indica que se ha superado el límite de productos para añadir */}
        <div className={`Modal ${modalOpen ? 'is_shown' : ''}`}>
            <span>No es posible añadir más productos</span>
            <button onClick={() => ToggleModal()}>cerrar</button>
        </div>
    </>)
}



export default Albumes