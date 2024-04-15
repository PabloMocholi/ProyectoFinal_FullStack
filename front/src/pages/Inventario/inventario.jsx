import { useEffect, useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'
import './inventario.css'
import Elemento from '../../components/ElementoInventario/elemento.jsx'
import AddAlbum from '../../components/AddAlbum/addalbum.jsx'
import Usuarios from '../Usuarios/usuarios.jsx'

const Inventario = () => {

    const [inventario, setInventario] = useState([])
    const [isOpen, setOpen] = useState(false)

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
                <a className='a' href="#panelUsuarios">Usuarios</a>
                <a className='a' href="#panelInventario">Inventario</a>
            </div>

        </div>



        <div>
            <h2 id='panelInventario'>Inventario:</h2>
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
        </div>

        <div >
            <h2 id='panelUsuarios'>Usuarios</h2>
            <Usuarios />
        </div>

    </>)
}


export default Inventario