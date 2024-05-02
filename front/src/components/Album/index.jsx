
import { useState, useContext } from 'react'
import './index.css'
import { carritoContext } from '../../pages/Albumes';
const { VITE_URL_IMGS } = import.meta.env;


/**
 * 
 * Componente que carga la vista de un album 
 * @hook {useContext} recoge los datos de los artículos en el carritoy la función para insertar en él
 * @hook {useState} indica si se debe mostrar el ligthbox del album
 * @prop {Object} datos información relativa al album {_id, nombre, imagen, artista, precio,stock}
 * 
 */
export const Album = ({ datos }) => {

    const { _id, nombre, imagen, artista, precio, stock } = datos
    const { carrito, setCarrito, addToCarrito } = useContext(carritoContext);
    const [isOpen, setOpen] = useState(false)

    /**
    *  Función que muestra u oculta el lightbox del album 
    */
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    /**
     * 
     *  Función que se encarga de mañadir a carrito el elemento y cerrar el lightbox
     *  
     *  @param {Object} album album añadido al carrito
     */
    const procesarCompra = (album) => {
        console.log(carrito)
        ToggleActive()
        addToCarrito(album)

    }


    return (<>
        {/** div que contiene la información del album */}
        <div className={stock > 0 ? "Album" : "Album--disabled"} onClick={() => stock > 0 && ToggleActive()}>    {/** comprueba si hay stock disponible y en consecuencia habilita la interactividad y modifica la clase*/}
            <div className='background-img' style={{ backgroundImage: `url(${VITE_URL_IMGS}${imagen})` }}></div>    {/** div del mismo tamaño que se muestra por detrás y permite crear un efecto de desenfoque */}
            <div className='Album-content'>
                {/** muestra la imagen del album y añade un png que indica si está agotado en función del stock */}
                <img className='img' src={`${VITE_URL_IMGS}${imagen}`} alt="" />
                {
                    stock == 0 && <img className='agotado' src={`${VITE_URL_IMGS}agotado.png`} alt="" />
                }
                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2'>{nombre}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>
                    {/** muestra el precio solamente si hay unidades disponibles */}
                    {
                        stock > 0 && <span className='precio'>{precio}€</span>
                    }


                </div>
            </div>
        </div>

        {/** muestra u oculta el lightbox del album en función de si se le ha hecho click  */}
        {
            isOpen && <AlbumLightBox ToggleActive={ToggleActive} datos={datos} procesarCompra={procesarCompra} />

        }

    </>)

}


/**
 * 
 * Componente que carga la vista de compra de un album  (lightbox)
 * @hook {useContext} recoge los datos de los artículos en el carritoy la función para insertar en él
 * @prop {Function} ToggleActive indica si se debe mostrar u ocultar este componente
 * @prop {Object} datos información relativa al album {_id, nombre, imagen, artista, precio,stock}
 * @prop {Fucntion} procesarCompra función que permite añadir a carrito el album mostrado
 * 
 */
const AlbumLightBox = ({ ToggleActive, datos, procesarCompra }) => {

    const { _id, nombre, imagen, stock, artista, precio } = datos
    const { carrito, setCarrito, addToCarrito } = useContext(carritoContext);

    return (<>
        {/** div que muestra en detalle el producto */}
        <div className='AlbumL'>
            <div className='AlbumL-data'>
                <div >
                    <img className='img imgL' src={`${VITE_URL_IMGS}${imagen}`} alt="" />

                </div>

                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2L'>{nombre}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>
                    <div className='Album-info-bottom'>
                        <span>Precio: {precio}</span>
                        <span>Disponibles: {stock}</span>


                    </div>

                </div>
            </div>
            {/** botón para añadir al carrito */}
            <button className='buttonAddCarrito' onClick={() => procesarCompra(datos)}>Añadir a carrito</button>
            {/** botón para ocultar este componente */}
            <span className='buttonClose' onClick={ToggleActive}>X</span>


        </div>


    </>)
}