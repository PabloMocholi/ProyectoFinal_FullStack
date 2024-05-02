import { useContext, useEffect, useState } from "react";
import { carritoContext } from "../../pages/Albumes";
import './carrito.css'
import { LoginContext } from "../layout";
import { easyFetch } from "../../../helpers/utils.js";

/**
 * 
 * Componente que muestra los elementos del carrito
 * @hook {useContext} recoge los datos de los artículos en el carrito y la función para insertar en él
 * @hook {useContext} recoge los datos del usuario que logeado
 * @hook {useState} establece el precio total a pagar por la compra
 * @hook {useState} indica si se debe mostrar el modal para finalizar la compra
 * @hook {useEffect} llama a la función que calcula el precio cada vez que se actualiza el carrito
 * @prop {Boolean} isOpen indica si se debe mostrar el carrito
 * @prop {Boolean} ToggleActive función que establece el valor de isOpen
 * @prop {Function} cargarAlbumes función que obtiene todos los albumes de la API
 * 
 */
const Carrito = ({ isOpen, ToggleActive, cargarAlbumes }) => {

    const { carrito, setCarrito } = useContext(carritoContext);
    const { userData } = useContext(LoginContext);
    const { VITE_URL_IMGS } = import.meta.env;
    const { VITE_URL } = import.meta.env;
    const [precioTotal, setPrecioTotal] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)

    /**
   *  Función que muestra u oculta el modal para finalizar la compra
   */
    const ToggleModal = () => {
        console.log("MODAL")
        setModalOpen(!modalOpen);
    }

    useEffect(() => {
        calcularTotal()
    }, [carrito])

    /**
     * Función que calcula el precio total de los productos añadidos al carrito
     */
    const calcularTotal = () => {
        console.log("calculo total")
        let precioTotal = 0;
        carrito.forEach((album) => precioTotal += (album.precio * album.cantidad))
        console.log(precioTotal)
        setPrecioTotal(precioTotal)

    }

    /**
     * Función que finaliza la compra y añade un nuevo registro a la BBDD
     */
    const handlePostCarrito = () => {
        console.log(carrito)
        easyFetch({
            url: `${VITE_URL}/carrito`,
            method: "POST",
            body: [userData, carrito, precioTotal],
            callback: (data) => {
                console.log(" compra realizada!", data)
                setCarrito([])
                ToggleActive()
                ToggleModal()
                cargarAlbumes();
            }
        })
    }

    /**
     * 
     *  Función que permite eliminar un elemento del carrito
     *  
     *  @param {Object} album album a eliminar
     */
    const eliminarElemento = (album) => {

        const index = carrito.findIndex(a => a._id === album._id);
        const nuevoCarrito = [...carrito];

        //Comprueba que queda más de una unidad
        if (album.cantidad - 1 != 0) {

            nuevoCarrito[index] = {
                ...nuevoCarrito[index],
                cantidad: nuevoCarrito[index].cantidad - 1

            }
        } else { //elimina del carrito
            nuevoCarrito.splice(index, 1)
        }

        setCarrito(nuevoCarrito)

    }


    /**
     * 
     *  Función que permite añadir un elemento a carrito
     *  
     *  @param {Object} album album a añadir 
     */
    const addElemento = (album) => {

        const index = carrito.findIndex(a => a._id === album._id);
        const nuevoCarrito = [...carrito];

        nuevoCarrito[index] = {
            ...nuevoCarrito[index],
            cantidad: nuevoCarrito[index].cantidad + 1

        }

        setCarrito(nuevoCarrito)

    }



    return (<>
        {/** div con la información del carrito */}
        <div className={`Carrito ${isOpen ? "is-active" : ""} `}>
            <h3>Tu carrito</h3>
            <button className="closeCarrito" onClick={ToggleActive}>X</button>
            {
                carrito.length > 0 && carrito.map((album) => {
                    return (<>
                        <div className="itemCarrito">
                            <img className="itemCarrito-img" src={`${VITE_URL_IMGS}${album.imagen}`} alt={album.imagen} />
                            <div className="itemCarrito-datos">
                                <span className="u-bold">{album.nombre}</span>
                                <span>Cantidad:{album.cantidad}</span>
                                {/** precio se calcula como la cantidad de elementos multiplicado por su precio y fijado a dos decimales */}
                                <span>Precio:{(album.cantidad * album.precio).toFixed(2)}</span>
                            </div>
                        </div>
                        {/** botones que permiten añadir o eliminar unidades del mismo album */}
                        <div className="controles">
                            <button className="controles-btn" onClick={() => eliminarElemento(album)}> - </button>
                            {/** comprueba que añadir un nuevo elemento no supera el stock disponible, en caso de superarlo oculta el botón*/}
                            {album.stock > album.cantidad && <button className="controles-btn" onClick={() => addElemento(album)}> + </button>}

                        </div>

                        {/** decoración que sirve para separar elementos */}
                        <span className="limit">------------------</span>
                    </>)
                })
            }

            <span>TOTAL COMPRA: <b>{precioTotal.toFixed(2)}</b></span>
             {/** botón que permite mostrar el modal de formalizar compra si detecta que algún elemento en el carrito */}
            {carrito.length > 0 && <button className="comprarBtn" onClick={ToggleModal}>COMPRAR</button>}
        </div>


        {/** Modal que permite finalizar la compra */}
        <div className={`Modal ${modalOpen ? 'is_shown' : ''}`}>
            <span>¿Desea finalizar la compra?</span>
            <div className='Modal-botones'>
                <button onClick={handlePostCarrito} >Comprar</button>
                <button onClick={ToggleModal} >cerrar</button>
            </div>

        </div>

    </>)
}

export default Carrito