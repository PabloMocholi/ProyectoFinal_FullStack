import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Navigation from './navigation/navigation';

export const LoginContext = createContext([]);

export const Layout = () => {
    const [isLoged, setIsLoged] = useState(false)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {

        if (!isLoged) {
            navigate('/login');
        }
    }, [isLoged]);


    return (<>
        <LoginContext.Provider value={{isLoged, setIsLoged, userData, setUserData}}>
            {
                isLoged ? <>
                    <Navigation />
                    <div className='content '>
                        <Outlet />
                    </div>

                    <footer className='footer'>footer</footer>
                </> : <div className='content '>
                    <Outlet />
                </div>

            }

        </LoginContext.Provider>
    </>)
}