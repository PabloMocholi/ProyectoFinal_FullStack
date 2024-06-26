import { useState, useEffect, useContext } from "react"
import { easyFetch } from "../../helpers/utils"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "../components/layout.jsx";
import './login.css'

/**
 * 
 * Componente que carga el formulario de inicio
 * @hook {useState} recoge los datos del formulario
 * @hook {useContext} maneja los datos del usuario registrado
 * @hook {useState} indica si se muestra o no el formulario de registro
 * 
 */

const Login = () => {

    const [formData, setFormData] = useState({})
    const { isLoged, setIsLoged, setUserData } = useContext(LoginContext);
    const [isOpen, setOpen] = useState(false)

    /**
     *  Función que muestra u oculta el formulario de registro
     */
    const ToggleActive = () => {
        setOpen(!isOpen);
    }

    //API a la que se realiza el request
    const { VITE_URL } = import.meta.env;

    /* Permite la redirección a otra página*/
    const navegador = useNavigate()


    /**
     * 
     *  Función que se encarga de mantener las variables del form actualizadas
     *  
     *  @param {event} e evento que se produce
     */

    const handleInputChange = (e) => {
        console.log("inputchage")
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }

    /**
     * 
     *  Función que se encarga de realizar el fetch a la url proporcionada y redirecciona según el rol
     *  
     *  @param {event} event evento que se produce
    */
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
                    if (data[0].is_admin)
                        navegador("/inventario")
                    else
                        navegador("/home")
                    setUserData({
                        id: data[0]._id,
                        nombre: data[0].nombre,
                        is_admin: data[0].is_admin
                    })
                } else {
                    alert("Inténtalo otra vez, revisa tu conexión o tus credenciales")
                }
            }
        })
    }

    /**
     * 
     *  Función que se encarga de registrar un nuevo usuario
     *  
     *  @param {event} event evento que se produce
    */
    const handleRegister = (event) => {
        event.preventDefault();
        console.log("handleLogin")
        easyFetch({
            url: `${VITE_URL}/register`,
            body: formData,
            method: "POST",
            callback: (data) => {
                console.log("usuario registrado", data)
                setOpen(false)
                alert("Usuario registrado")
            }
        })
    }

    return (
        <>
            {/** Formulario de inicio de sesión */}
            <div className="Login">
                <h1>RE-PLAY</h1>
                <form className="form" onSubmit={handleLogin} action="#" method="POST">
                    <label htmlFor="user">Usuario</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="text" name="user" id="user" required />
                    <label htmlFor="pass">Contraseña</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="password" name="pass" id="pass" required/>
                    <button className="button" type="submit" >Login</button>

                </form>
                <div>
                    <span> ¿Eres nuevo por aquí?</span>
                    <button className="registrate" onClick={ToggleActive}>Regístrate</button>

                </div>
            </div>

            {/** Formulario de registro */}
            <div className={`div-register ${isOpen ? 'is_active' : ''}`}>
                <h1>¿¡Ya casi estás!</h1>
                <button className="right" onClick={ToggleActive}>X</button>
                <form className="form-register" onSubmit={handleRegister} action="#" method="POST">
                    <label htmlFor="user">Usuario</label>
                    <input className="u-marginBottom" required onChange={handleInputChange} type="text" name="user" id="user" />
                    <label htmlFor="pass">Contraseña</label>
                    <input className="u-marginBottom" required onChange={handleInputChange} type="password" name="pass" id="pass" />
                    <label htmlFor="mail">Email</label>
                    <input className="u-marginBottom" required onChange={handleInputChange} type="text" name="mail" id="mail" />
                    <label htmlFor="dir">Dirección</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="text" name="dir" id="dir" />
                    <label htmlFor="ciudad">Ciudad</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="text" name="ciudad" id="ciudad" />
                    <label htmlFor="tlf">Teléfono</label>
                    <input className="u-marginBottom" onChange={handleInputChange} type="tel" pattern="[0-9]{9}" placeholder="666666666" name="tlf" id="tlf" />

                    <button className="button" type="submit" >Registrarse</button>

                </form>
            </div>

        </>
    )
}

export default Login