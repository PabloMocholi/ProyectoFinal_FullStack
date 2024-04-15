import { useContext } from "react"
import { Link } from 'react-router-dom'
import { LoginContext } from "../layout.jsx";
import { useNavigate } from "react-router-dom"
import './navigation.css'

const Navigation = () => {
    const { isLoged, setIsLoged, userData } = useContext(LoginContext);
    const navegador = useNavigate()

    function Logout() {
        setIsLoged(false)
        navegador("/login")
    }


    return (<>
        <nav className='nav'>
            <ul className="ul">

                {
                    (isLoged && userData.is_admin == false) ? <>
                        <li className="li">
                            <Link className="link" to="/home">Home</Link>
                        </li>
                        <li className="li">
                            <Link className="link" to="/albumes">Albumes</Link>
                        </li>
                        <li className="li">
                            <Link className="link" to="/perfil">Perfil</Link>
                        </li>
                        <li className="li" > <button className="button" onClick={Logout}>Logout</button> </li></> :


                        (isLoged && userData.is_admin == true) ? <>
                           {/**<li className="li">
                                <Link className="link" to="/inventario">Inventario</Link>
                            </li>
                            <li className="li">
                                <Link className="link" to="/usuarios">Usuarios</Link>
                            </li> */} 
                            <li className="li fixed" > <button className="button" onClick={Logout}>Logout</button> </li></> :

                            <li className="li">< Link className="link" to="/login">Login</Link>
                            </li>
                }

            </ul>
        </nav>
    </>)
}

export default Navigation