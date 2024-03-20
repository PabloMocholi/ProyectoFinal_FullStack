import { useState, useEffect, useContext } from "react"
import { easyFetch } from "../../helpers/utils"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/layout.jsx";
import './login.css'



const Login = () => {

    const [formData, setFormData] = useState({})
    const [userLoged, setLoged] = useState([])
    const [isLoged, setIsLoged] = useContext(LoginContext);


    const navegador = useNavigate()

    const handleInputChange = (e) => {
        console.log("inputchage")
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }

    const handleLogin = (event) => {
        event.preventDefault();  
        console.log("handleLogin")
        easyFetch({
            url: "http://localhost:3000/API/v1/login",
            body: formData,
            method: "POST",
            callback: (data) => {
                console.log(" compruebo login", data)
                console.log("DATA", data)
                setLoged(data)
    
                if (Object.keys(data).length > 0) {
                    alert("EXITO")
                    setIsLoged(true);
                    navegador("/home")
                } else {
                    alert("Usuario incorrecto")
                }
            }
        })
    }

    const handleRegister = (event) => {
        
        console.log("handleLogin")
        easyFetch({
            url: "http://localhost:3000/API/v1/register",
            body: formData,
            method: "POST",
            callback: (data) => {
                console.log("usuario registrado", data)

         
    
            }
        })
    }
    
    return (
        <>
            <div className="Login">
                <h1>RE-PLAY</h1>
                <form className="form" onSubmit={handleLogin} action="#" method="POST">
                    <label htmlFor="user">Usuario</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="text" name="user" id="user" />
                    <label htmlFor="pass">Contraseña</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="password" name="pass" id="pass" />
                    <button className="button" type="submit">Login</button> 
                </form>
            </div>

            {/*<button onClick={handleRegister} className="button" type="submit">¿No tienes cuenta?</button> */}
        </>
    )
}

export default Login