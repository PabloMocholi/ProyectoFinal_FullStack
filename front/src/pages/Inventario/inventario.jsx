import { useEffect, useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'
import './inventario.css'
import Elemento from '../../components/ElementoInventario/elemento.jsx'
import AddAlbum from '../../components/AddAlbum/addalbum.jsx'
import Usuarios from '../Usuarios/usuarios.jsx'

const Inventario = () => {

    const [inventario, setInventario] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [pantalla, setPantalla] = useState("inventario")


    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    const { VITE_URL } = import.meta.env;

    const cargaInventario = () => {
        easyFetch({
            url: `${VITE_URL}/albumes`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setInventario(data.data)
            }
        })
    }

    useEffect(() => {
        cargaInventario()
    }, [])





    return (<>
        <div className='intro'>

            <h1>Panel de administrador</h1>
            <div className='intro-a'>
                <a onClick={() => setPantalla("usuario")} className={pantalla == "usuario" ? ' a active' : ' a '}>Usuarios</a>
                <a onClick={() => setPantalla("inventario")} className={pantalla == "inventario" ? ' a active' : ' a '}>Inventario</a>
            </div>

        </div>

        {
            pantalla == "inventario" ? <>
                <div id='panelInventario' >
                    <div className='Inventario'>
                        {
                            inventario && inventario.map((elemento) => {
                                return (<>

                                    <Elemento key={elemento._id} datos={elemento} cargaInventario={cargaInventario} />

                                </>)
                            })
                        }
                    </div>
                    <button onClick={ToggleActive} className='add'>+</button>
                    {
                        isOpen && <AddAlbum isOpen={isOpen} ToggleActive={ToggleActive} cargaInventario={cargaInventario} />
                    }
                </div></> :
                <>

                    <div >
                        <Usuarios />
                    </div></>

        }



    </>)
}


export default Inventario