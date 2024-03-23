import './index.css'
import { useState } from 'react';

export const Home = () => {
    const [letraActiva, setLetraActiva] = useState();
    const titulo = ['B', 'i', 'e', 'n', 'v', 'e', 'n', 'i', 'd', 'o']

    const handleClick = (index) => {
        setLetraActiva(index);

        //Reproducir sonido

        setTimeout(() => {
            setLetraActiva();
        }, 300); // Tiempo de la transición en milisegundos
    };

    return (
        <div className='Home'>
            {
                titulo.map((letra, index) => (
                    <h1 key={index} className={`tit ${letraActiva == index ? 'active' : ''}`} onClick={() => handleClick(index)}>
                        {letra}
                    </h1>
                ))}
        </div>
    );
};
export default Home