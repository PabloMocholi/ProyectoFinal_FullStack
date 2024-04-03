import { useEffect, useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'
import './inventario.css'
import Elemento from '../../components/ElementoInventario/elemento.jsx'
import AddAlbum from '../../components/AddAlbum/addalbum.jsx'

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
        <div className='Inventario'>
            {
                inventario && inventario.map((elemento) => {
                    return (<>

                        <Elemento key={elemento._id} datos={elemento}  cargaInventario={cargaInventario} />

                    </>)
                })
            }
        </div>
        <button onClick={ToggleActive} className='add'>+</button>
        {
            isOpen && <AddAlbum isOpen={isOpen} ToggleActive={ToggleActive} cargaInventario={cargaInventario} />
        }
    </>)
}


export default Inventario