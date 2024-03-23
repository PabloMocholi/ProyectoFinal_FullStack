
import { useState } from 'react'
import './index.css'

export const Album = ({ titulo, imagen, artista, fecha, precio }) => {

    const [isOpen, setOpen] = useState(false)
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    return (<>

        <div className='Album' onClick={ToggleActive}>
            <div className='background-img' style={{ backgroundImage: `url(${imagen})` }}></div>
            <div className='Album-content'>
                <img className='img' src={imagen} alt="" />
                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2'>{titulo}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>
                    <div className='Album-info-bottom'>
                        <span className=''>Fecha lanzamiento:{fecha} </span>
                        <span className='precio'>{precio}€</span>
                    </div>
                </div>
            </div>
        </div>

        {

            isOpen && <AlbumLightBox ToggleActive={ToggleActive} titulo={titulo} imagen={imagen} artista={artista} fecha={fecha} precio={precio} />


        }



    </>)

}



const AlbumLightBox = ({ToggleActive, titulo, imagen, artista, fecha, precio }) => {
    return (<>
        <div className='AlbumL'>


            <div className='Album-content'>
                <img className='img' src={imagen} alt="" />
                <div className='Album-info'>
                    <div className='Album-info-top'>
                        <h2 className='h2'>{titulo}</h2>
                        <h4 className='h4'>{artista}</h4>
                    </div>
                    <div className='Album-info-bottom'>
                        <span className=''>Fecha lanzamiento:{fecha} </span>
                        <span className='precio'>{precio}€</span>
                    </div>
                </div>
            </div>
            <span onClick={ToggleActive}>CLOSE</span>


        </div>


    </>)
}