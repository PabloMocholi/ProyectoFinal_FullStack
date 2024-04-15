
import { useState, useContext } from 'react'
import './index.css'
import { carritoContext } from '../../pages/Albumes';
const { VITE_URL_IMGS } = import.meta.env;

export const Album = ({ datos}) => {

    const {_id, nombre, imagen, artista, precio,stock} = datos
    const { carrito, setCarrito, addToCarrito } = useContext(carritoContext);
    

    const [isOpen, setOpen] = useState(false)
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    const procesarCompra = (album)=>{

        ToggleActive()
        addToCarrito(album)

    }


    return (<>

        <div className={ stock > 0 ? "Album" : "Album--disabled"} onClick={()=> stock > 0 && ToggleActive()}>
            <div className='background-img' style={{ backgroundImage: `url(${VITE_URL_IMGS}${imagen})` }}></div>
            <div className='Album-content'>
                <img className='img'src={`${VITE_URL_IMGS}${imagen}`} alt="" />
                {
                    stock == 0 && <img className='agotado'src={`${VITE_URL_IMGS}agotado.png`} alt="" />
                }
                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2'>{nombre}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>

                    <span className='precio'>{precio}€</span>

                </div>
            </div>
        </div>

        {

            isOpen && <AlbumLightBox ToggleActive={ToggleActive} datos={datos} procesarCompra={procesarCompra} />


        }



    </>)

}


const AlbumLightBox = ({ ToggleActive, datos, procesarCompra }) => {

    const {_id, nombre, imagen, stock, artista, precio} = datos
    const { carrito, setCarrito, addToCarrito } = useContext(carritoContext);

    return (<>
        <div className='AlbumL'>


            <div className='AlbumL-data'>
                <div >
                    <img className='img' src={`${VITE_URL_IMGS}${imagen}`} alt="" />

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
            <button onClick={()=>procesarCompra(datos)}>Añadir a carrito</button>


            <span className='buttonClose' onClick={ToggleActive}>CLOSE</span>


        </div>


    </>)
}