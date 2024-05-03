import { useEffect, useState } from 'react'
import { easyFetch } from './../../../helpers/utils.js'
import './inventario.css'
import Elemento from '../../components/ElementoInventario/elemento.jsx'
import AddAlbum from '../../components/AddAlbum/addalbum.jsx'
import Usuarios from '../Usuarios/usuarios.jsx'


/**
 * 
 * Componente que muestra la vista del administrador
 * @hook {useState} contiene el contenido de los albumes
 * @hook {useState} indica si se debe mostrar u ocultar el form para añadir un nuevo album
 * @hook {useState} contiene un string para marcar que contenido se debe mostrar
 * @hook {useEffect} realiza la petición de datos a la API cuando se renderiza el componente
 */

const Inventario = () => {

    const [inventario, setInventario] = useState([])
    const [isOpen, setOpen] = useState(false)
    const [pantalla, setPantalla] = useState("inventario")


    /**
     * Función que indica si se debe mostrar el formulario para añadir
     */
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    const { VITE_URL } = import.meta.env;


    /**
     * Función que realiza el fetch y establece los datos
     */
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

        {/** div que permite la navegación entre los componentes disponiibles para el admin */}
        <div className='intro'>

            <h1 className='intro-h1'>Panel de administrador</h1>
            <div className='intro-a'>
                <a onClick={() => setPantalla("usuario")} className={pantalla == "usuario" ? ' a active' : ' a '}>Usuarios</a>
                <a onClick={() => setPantalla("inventario")} className={pantalla == "inventario" ? ' a active' : ' a '}>Inventario</a>
            </div>

        </div>

        {
            //si visualizamos el inventario observamos los distintos albumes 
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
                    {/** botón para añadir un nuevo album */}
                    <button onClick={ToggleActive} className='add'>+</button>
                    {
                        isOpen && <AddAlbum isOpen={isOpen} ToggleActive={ToggleActive} cargaInventario={cargaInventario} />
                    }
                </div></> :
                <>
                    {/** si visualizamos los usuarios renderizamos el componente Usuarios  */}
                    <div >
                        <Usuarios />
                    </div></>

        }



    </>)
}


export default Inventario