import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Navigation from './navigation/navigation';
import Footer from './Footer/footer';

/**
 * Contexto que contiene la información del usuario registrado
 * 
 * @context
 * 
 * @property {Boolean} isLoged indica si el usuario está registrado
 * @property {Function} setIsLoged actualiza el valor de isLoged
 * @property {Object} userData almacena la información relevante del usuario
 * @property {Function} setUserData actualiza el valor de userData
 * @property {Boolean} isLoaded indica si se ha cargado el contenido
 * @property {Function} setIsLoged actualiza el valor de isLoaded
 * @components {Login, Carrito, Home, Perfil, Navigation }
 */
export const LoginContext = createContext([]);


/**
 * 
 * Componente que gestiona lo que se muestra por pantalla
 * @hook {useState} inidica si se ha registrado un usuario
 * @hook {useState} recoge la información del usuario registrado
 * @hook {useState} indica si se ha cargado el contenido
 * @hook {useEffect} redirecciona a la página principal si se ha logeado un usuario
 * 
 */
export const Layout = () => {
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState({})
    const [isLoaded, setLoaded] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {

        if (!isLoged) {
            navigate('/login');
        }
    }, [isLoged]);


    return (<>
        {/** se establece el contexto */}
        <LoginContext.Provider value={{ isLoged, setIsLoged, userData, setUserData, isLoaded, setLoaded }}>
            {
                //si se ha logeado el usuario...
                isLoged ? <>
                    {/** muestra el navegadcor  */}
                    <Navigation />
                    {/** muestra el componente correspondiente a la página  */}
                    <div className='content '>
                        <Outlet />

                    </div>
                    {/** muestra el footer solamente si el usuario es un cliente  */}
                    {!userData.is_admin && <Footer />}

                </> : <div className='content '>
                    <Outlet />
                </div>

            }

        </LoginContext.Provider>
    </>)
}