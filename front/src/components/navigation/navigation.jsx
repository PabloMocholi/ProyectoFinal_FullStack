import { useContext } from "react"
import { Link } from 'react-router-dom'
import { LoginContext } from "../layout.jsx";
import { useNavigate } from "react-router-dom"
import './navigation.css'

const Navigation = () => {
    const [isLoged, setIsLoged] = useContext(LoginContext);
    const navegador = useNavigate()

    function Logout() {
        setIsLoged(false)
        navegador("/login")
    }

    return (<>
        <nav className='nav'>
            <ul className="ul">

                {
                    isLoged ? <>
                        <li className="li">
                            <Link className="link" to="/home">Home</Link>
                        </li>
                        <li className="li">
                            <Link className="link" to="/albumes">Albumes</Link>
                        </li>
                        <li className="li" > <button className="button" onClick={Logout}>Logout</button> </li></> :
                        <li className="li">< Link className="link" to="/login">Login</Link>
                        </li>
                }

            </ul>
        </nav>
    </>)
}

export default Navigation