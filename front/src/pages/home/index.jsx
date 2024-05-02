import './index.css'
import { useState, useRef, useEffect, useContext } from 'react';
import { LoginContext } from "../../components/layout.jsx";

import audioFile1 from '../../audios/1.mp3';
import audioFile2 from '../../audios/2.mp3';
import audioFile3 from '../../audios/3.mp3';
import audioFile4 from '../../audios/4.mp3';
import audioFile5 from '../../audios/5.mp3';
import audioFile6 from '../../audios/6.mp3';
import audioFile7 from '../../audios/7.mp3';
import audioFile8 from '../../audios/8.mp3';
import audioFile9 from '../../audios/9.mp3';

/**
 * 
 * Componente que muestra la información de la página principal
 * @hook {useState} indica la letra pulsada
 * @hook {useContext} contiene la información del login y si se ha cargado la página
 * @hook {useRef} cada uno de las pistas de audio (x9)
 * @hook {useEffect} carga una animación cuando se ha logeado por primemra vez
 */

export const Home = () => {
    const [letraActiva, setLetraActiva] = useState();
    const { isLoaded, setLoaded } = useContext(LoginContext)
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    const audioRef3 = useRef(null);
    const audioRef4 = useRef(null);
    const audioRef5 = useRef(null);
    const audioRef6 = useRef(null);
    const audioRef7 = useRef(null);
    const audioRef8 = useRef(null);
    const audioRef9 = useRef(null);

    //texto que se muestra por pantalla
    const titulo = ['B', 'i', 'e', 'n', 'v', 'e', 'n', 'i', 'd', 'o']

    useEffect(() => {
        console.log(isLoaded)
        //espera de 2 segundos hasta mostrar el componente
        setTimeout(() => { setLoaded(true) }, 2000)
    }, [])

    /**
    * 
    *  Función que se  carga un audio diferente en función de la tecla pulsada
    *  
    *  @param {Number} index posición del array de letras
    */ 
    const playSound = (index) => {
        
        switch (index) {
            case 0:
                audioRef1.current.play();
                break;
            case 1:
                audioRef2.current.play();
                break;
            case 2:
                audioRef3.current.play();
                break;
            case 3:
                audioRef4.current.play();
                break;
            case 4:
                audioRef5.current.play();
                break;
            case 5:
                audioRef6.current.play();
                break;
            case 6:
                audioRef7.current.play();
                break;
            case 7:
                audioRef8.current.play();
                break;
            case 8:
                audioRef9.current.play();
                break;
            case 9:
                audioRef2.current.play();
                break;
        }

    };

    /**
    * 
    *  Función que se llama al recibir un evento de click
    *  
    *  @param {Number} index posición del array de letras
    */  
    const handleClick = (index) => {
        
        //establece la letra activa
        setLetraActiva(index);

        //llama a la función que reproduce el audio
        playSound(index)

        //espera dos segundos antes de desmarcar la letra pulsada como activa
        setTimeout(() => {
            setLetraActiva();
        }, 2000);
    };

    return (<>

        {/** Asocia cada elemento de audio con una pista de audio */}
        <audio ref={audioRef1}>
            <source src={audioFile1} type="audio/mpeg" />
        </audio>

        <audio ref={audioRef2}>
            <source src={audioFile2} type="audio/mpeg" />
        </audio>
        <audio ref={audioRef3}>
            <source src={audioFile3} type="audio/mpeg" />
        </audio>

        <audio ref={audioRef4}>
            <source src={audioFile4} type="audio/mpeg" />
        </audio>
        <audio ref={audioRef5}>
            <source src={audioFile5} type="audio/mpeg" />
        </audio>

        <audio ref={audioRef6}>
            <source src={audioFile6} type="audio/mpeg" />
        </audio>
        <audio ref={audioRef7}>
            <source src={audioFile7} type="audio/mpeg" />
        </audio>

        <audio ref={audioRef8}>
            <source src={audioFile8} type="audio/mpeg" />
        </audio>
        <audio ref={audioRef9}>
            <source src={audioFile9} type="audio/mpeg" />
        </audio>

        {
            // si pasa el tiempo de carga muestra el contenido del componente
            isLoaded ? <> <div className='Home u-center'>
                <div className='Home-letras'>
                    {
                        titulo.map((letra, index) => (
                            <h1 key={index} className={`tit ${letraActiva == index ? 'activa' : ''}`} onClick={() => handleClick(index)}>
                                {letra}
                            </h1>
                        ))}
                </div>
                <span>¡Pulsa las letras y crea tu melodía!</span>
            </div></> : <>
                {/** mientras dura el tiempo de carga muestra una animación */}
                <div className='Loading u-center'>
                    <div className='u-center'>
                        <h2>Cargando...</h2>
                        <img src="/load.gif" alt="load_gif" />
                    </div>

                </div>

            </>
        }





    </>


    );
};

export default Home