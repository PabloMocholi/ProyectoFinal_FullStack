import './index.css'
import { useState, useRef } from 'react';
import audioFile from '../../audios/1.mp3';
import audioFile2 from '../../audios/1.mp3';

export const Home = () => {
    const [letraActiva, setLetraActiva] = useState();
    const titulo = ['B', 'i', 'e', 'n', 'v', 'e', 'n', 'i', 'd', 'o']

    const audioRef = useRef(null);
    const audioRef2 = useRef(null);

    const playSound = (index) => {

        switch (index) {
            case 0:
                audioRef.current.play();
                break;
            case 1:
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
        }, 300); // Tiempo de la transición en milisegundos
    };

    return (<>
        <audio ref={audioRef}>
            <source src={audioFile} type="audio/mpeg" />
        </audio>
        <audio ref={audioRef2}>
            <source src={audioFile2} type="audio/mpeg" />
        </audio>


        <div className='Home'>
            <div className='Home-letras'>


                {
                    titulo.map((letra, index) => (
                        <h1 key={index} className={`tit ${letraActiva == index ? 'activa' : ''}`} onClick={() => handleClick(index)}>
                            {letra}
                        </h1>
                    ))}
            </div>
            <span>¡Pulsa las letras y crea tu melodía!</span>
        </div></>


    );
};

export default Home