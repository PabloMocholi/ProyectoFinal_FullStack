
import { useEffect, useState } from 'react'
import './index.css'
import { Album } from '../../components/Album'
import {easyFetch} from './../../../helpers/utils.js'


export const Albumes = () => {

    const [albumes, setAlbumes] = useState([])

    const { VITE_URL } = import.meta.env;


    useEffect(()=>{

        easyFetch({
            url: `${VITE_URL}/albumes`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setAlbumes(data.data)
            }
        })

    },[])



    return (<>
        <div className='Albumes'>
            

            {
                albumes && albumes.map(album =>{
                    return(<>
                        <Album key={album._id} datos={album}/>
                    </>)
                })
            }
           {/** 
            * <Album titulo={"LA JOIA"} imagen={"https://app.activate.fm/news/img/bad_gyal_nuevo_album_la_joia.jpg"} artista={"BAD GYAL"} fecha={"04/03/2024"} precio={23}/>
            <Album titulo={"Cuando No Sé Quién Soy"} imagen={"https://m.media-amazon.com/images/I/913-R1MWfTL._UF894,1000_QL80_.jpg"} artista={"Amaia"} fecha={"12/03/2024"} precio={12} />
           */} 
       
        </div>

    </>)
}



export default Albumes