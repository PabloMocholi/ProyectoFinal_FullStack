import { useContext, useEffect, useState } from "react";
import { carritoContext } from "../../pages/Albumes";
import './carrito.css'
import { LoginContext } from "../layout";
import { easyFetch } from "../../../helpers/utils.js";


const Carrito = ({ isOpen, ToggleActive, cargarAlbumes }) => {

    const { carrito, setCarrito } = useContext(carritoContext);
    const { userData } = useContext(LoginContext);
    const { VITE_URL_IMGS } = import.meta.env;
    const { VITE_URL } = import.meta.env;
    const [precioTotal, setPrecioTotal] = useState(0)

    useEffect(() => {
        calcularTotal()
    }, [carrito])

    const calcularTotal = () => {
        console.log("calculo total")
        let precioTotal = 0;
        carrito.forEach((album) => precioTotal += (album.precio * album.cantidad))
        console.log(precioTotal)
        setPrecioTotal(precioTotal)

    }

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
                cargarAlbumes();
            }
        })
    }

    const eliminarElemento = (album) => {

        const index = carrito.findIndex(a => a._id === album._id);
        const nuevoCarrito = [...carrito];

        if (album.cantidad - 1 != 0) {

            nuevoCarrito[index] = {
                ...nuevoCarrito[index],
                cantidad: nuevoCarrito[index].cantidad - 1

            }
        } else {
            nuevoCarrito.splice(index, 1)
        }

        setCarrito(nuevoCarrito)

    }


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
                                <span>Precio:{(album.cantidad * album.precio).toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="controles">
                            <button className="controles-btn" onClick={() => eliminarElemento(album)}> - </button>
                            <button className="controles-btn" onClick={() => addElemento(album)}> + </button>
                        </div>


                        <span className="limit">------------------</span>
                    </>)
                })
            }

            <span>TOTAL COMPRA: <b>{precioTotal.toFixed(2)}</b></span>
            <button className="comprarBtn" onClick={handlePostCarrito}>COMPRAR</button>
        </div>
    </>)
}

export default Carrito