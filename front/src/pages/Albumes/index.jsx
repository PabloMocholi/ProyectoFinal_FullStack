
import { useState } from 'react'
import './index.css'
import { Album } from '../../components/Album'

export const Albumes = () => {
    return (<>
        <div className='Albumes'>
            {/**hacer que album sea un componente */}
            <Album titulo={"LA JOIA"} imagen={"https://app.activate.fm/news/img/bad_gyal_nuevo_album_la_joia.jpg"} artista={"BAD GYAL"} fecha={"04/03/2024"} precio={23}/>
            <Album titulo={"Cuando No Sé Quién Soy"} imagen={"https://m.media-amazon.com/images/I/913-R1MWfTL._UF894,1000_QL80_.jpg"} artista={"Amaia"} fecha={"12/03/2024"} precio={12} />
       
        </div>

    </>)
}



export default Albumes