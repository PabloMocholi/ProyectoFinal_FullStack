import { useContext } from "react"
import { Link } from 'react-router-dom'
import { LoginContext } from "./layout.jsx";
import { useNavigate } from "react-router-dom"


const Navigation = () => {
    const [isLoged, setIsLoged] = useContext(LoginContext);
    const navegador = useNavigate()

    function Logout() {
        setIsLoged(false)
        navegador("/login")
    }

    return (<>
        <nav className='nav'>
            <ul>

                {
                    isLoged ? <>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/albumes">Albumes</Link>
                        </li>
                        <li> <button onClick={Logout}>Logout</button> </li></> :
                        <li><Link to="/login">Login</Link>
                        </li>
                }

            </ul>
        </nav>
    </>)
}

export default Navigation