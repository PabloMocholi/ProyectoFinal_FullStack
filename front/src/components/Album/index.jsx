
import { useState } from 'react'
import './index.css'
const { VITE_URL_IMGS } = import.meta.env;


export const Album = ({ datos}) => {

    const {_id, nombre, imagen, artista, precio} = datos
    

    const [isOpen, setOpen] = useState(false)
    const ToggleActive = () => {
        setOpen(!isOpen);
    }


    return (<>

        <div className='Album' onClick={ToggleActive}>
            <div className='background-img' style={{ backgroundImage: `url(${VITE_URL_IMGS}${imagen})` }}></div>
            <div className='Album-content'>
                <img className='img'src={`${VITE_URL_IMGS}${imagen}`} alt="" />
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

            isOpen && <AlbumLightBox ToggleActive={ToggleActive} datos={datos} />


        }



    </>)

}


const AlbumLightBox = ({ ToggleActive, datos }) => {

    const {_id, nombre, imagen, stock, artista, precio} = datos

    return (<>
        <div className='AlbumL'>


            <div className='AlbumL-data'>
                <div >
                    <img className='img' src={`${VITE_URL_IMGS}${imagen}`} alt="" />

                </div>

                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2'>{nombre}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>
                    <div className='Album-info-bottom'>
                        <span>Precio: {precio}</span>
                        <span>Disponibles: {stock}</span>
                    

                    </div>

                </div>
            </div>
            <button>Añadir a carrito</button>


            <span className='buttonClose' onClick={ToggleActive}>CLOSE</span>


        </div>


    </>)
}