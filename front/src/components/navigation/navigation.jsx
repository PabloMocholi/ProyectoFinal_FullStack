import { useContext } from "react"
import { Link } from 'react-router-dom'
import { LoginContext } from "../layout.jsx";
import { useNavigate } from "react-router-dom"
import './navigation.css'


/**
 * 
 * Componente que permite la navegación entre páginas
 * @hook {useContext} maneja los datos del usuario registrado
 * @hook {useNavigate} permite la redirección a la páginas según su url asociada
 */


const Navigation = () => {
    const { isLoged, setIsLoged, userData } = useContext(LoginContext);
    const navegador = useNavigate()

    /**
     * Función que perimte cerrar la sesión
     */
    function Logout() {
        setIsLoged(false)
        navegador("/login")
    }


    return (<>
        <nav className='nav'>
            <ul className="ul">
                {/** comprueba que se está registrado y el rol del usuario */}
                {
                    {/** rol de cliente */ }
                        (isLoged && userData.is_admin == false) ? <>
                        {/** página principal */}
                        <li className="li">
                            <Link className="link" to="/home">Home</Link>
                        </li>
                        {/** página con la lista de los álbumes */}
                        <li className="li">
                            <Link className="link" to="/albumes">Albumes</Link>
                        </li>
                        {/** página de perfil */}
                        <li className="li">
                            <Link className="link" to="/perfil">Perfil</Link>
                        </li>
                        {/** botón para cerrar sesión */}
                        <li className="li" > <button className="button" onClick={Logout}>Logout</button> </li></> :


                        (isLoged && userData.is_admin == true) ? <>
                            {/** los distintos a apartados del administrador son gestionados en su propio componente */}
                            <li className="li fixed" > <button className="button" onClick={Logout}>Logout</button> </li></> :

                            <li className="li">< Link className="link" to="/login">Login</Link>
                            </li>
                }

            </ul>
        </nav>
    </>)
}

export default Navigation