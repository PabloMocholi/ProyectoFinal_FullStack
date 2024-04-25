
import { useEffect, useState, createContext } from 'react'
import './index.css'
import { Album } from '../../components/Album'
import { easyFetch } from './../../../helpers/utils.js'
import Carrito from '../../components/Carrito/carrito.jsx';

export const carritoContext = createContext([]);

export const Albumes = () => {

    const [albumes, setAlbumes] = useState([])
    const [carrito, setCarrito] = useState([])
    const { VITE_URL } = import.meta.env;
    const [isOpen, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [buscador, setBuscador] = useState("")

    const actualizoBuscador = (e) => {
        setBuscador(e.target.value);
    }

    const ToggleModal = () => {
        setModalOpen(!modalOpen);
    }



    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    const cargarAlbumes = () => {
        easyFetch({
            url: `${VITE_URL}/albumes`,

            callback: (data) => {
                console.log(" recibo datos", data)
                setAlbumes(data.data)
            }
        })
    }

    useEffect(() => {
        cargarAlbumes()
    }, [])

    const addToCarrito = (album) => {

        console.log("Carrito", album)
        const index = carrito.findIndex(a => a._id === album._id);

        if (index !== -1) {
            console.log("ya en carrito")
            const nuevoCarrito = [...carrito];

            if (nuevoCarrito[index].stock > nuevoCarrito[index].cantidad) {

                nuevoCarrito[index] = {
                    ...nuevoCarrito[index],
                    cantidad: nuevoCarrito[index].cantidad + 1
                };

                setCarrito(nuevoCarrito)
            } else {

                ToggleModal()
            }

        } else {
            setCarrito([...carrito, { ...album, cantidad: 1 }])

        }
    }

    const  albumesFiltrados = albumes.filter((album) => {

      return(album.nombre.toLowerCase().includes(buscador.toLowerCase()) )


    });


    return (<>

        <carritoContext.Provider value={{ carrito, setCarrito, addToCarrito }}>
            <button className='carritoBtn' onClick={ToggleActive}><i class="fa-solid fa-cart-shopping"></i></button>
            <input type="text" name="buscador" id="buscador" placeholder="Buscador" onChange={actualizoBuscador} />
            <div className='Albumes'>
               
                {
                    albumes && albumesFiltrados.map(album => {
                        return (<>
                            <Album key={album._id} datos={album} />
                        </>)
                    })
                }

            </div>{
                <Carrito isOpen={isOpen} ToggleActive={ToggleActive} cargarAlbumes={cargarAlbumes} />
            }

        </carritoContext.Provider>
        <div className={`Modal ${modalOpen ? 'is_shown' : ''}`}>
            <span>No es posible añadir más productos</span>
            <button onClick={() => ToggleModal()}>cerrar</button>
        </div>
    </>)
}



export default Albumes