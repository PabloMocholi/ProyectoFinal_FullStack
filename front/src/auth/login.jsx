import { useState, useEffect, useContext } from "react"
import { easyFetch } from "../../helpers/utils"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/layout.jsx";
import './login.css'



const Login = () => {

    const [formData, setFormData] = useState({})
    const {isLoged, setIsLoged, setUserData} = useContext(LoginContext);

    const { VITE_URL } = import.meta.env;

    const navegador = useNavigate()

    const handleInputChange = (e) => {
        console.log("inputchage")
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }

    const handleLogin = (event) => {
        event.preventDefault();  
        easyFetch({
            url: `${VITE_URL}/login`,
            body: formData,
            method: "POST",
            callback: (data) => {
                console.log(" compruebo login", data)
    
                if (Object.keys(data).length > 0) {
                    console.log("exito")
                   // alert("EXITO")
                    setIsLoged(true);
                    if(data[0].is_admin)
                        navegador("/inventario")
                    else
                        navegador("/home")
                    setUserData({
                        id: data[0]._id,
                        nombre: data[0].nombre,
                        is_admin: data[0].is_admin
                    })
                } else {
                 //   alert("Usuario incorrecto")
                }
            }
        })
    }

    const handleRegister = (event) => {
        
        console.log("handleLogin")
        easyFetch({
            url: `${VITE_URL}/register`,
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
                    <button className="button" type="submit" onClick={handleLogin}>Login</button> 
               
                </form>
                <button className="button" type="submit" onClick={handleRegister}>Registro</button> 
            </div>

  

            {/*<button onClick={handleRegister} className="button" type="submit">¿No tienes cuenta?</button> */}
        </>
    )
}

export default Login