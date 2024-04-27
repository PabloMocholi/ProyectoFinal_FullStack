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


export const Home = () => {
    const [letraActiva, setLetraActiva] = useState();
    const titulo = ['B', 'i', 'e', 'n', 'v', 'e', 'n', 'i', 'd', 'o']
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


    useEffect(() => {
        console.log(isLoaded)
        setTimeout(() => { setLoaded(true) }, 2000)
    }, [])

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



    const handleClick = (index) => {
        setLetraActiva(index);
        //Reproducir sonido
        playSound(index)
        setTimeout(() => {
            setLetraActiva();
        }, 2000); // Tiempo de la transición en milisegundos
    };

    return (<>

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
                <div className='Loading u-center'>
                    <div className='u-center'>
                        <h2>Cargando...</h2>
                        <img src="./images/load.gif" alt="load_gif" />
                    </div>

                </div>

            </>
        }





    </>


    );
};

export default Home