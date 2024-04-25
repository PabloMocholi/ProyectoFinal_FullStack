import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Navigation from './navigation/navigation';
import Footer from './Footer/footer';

export const LoginContext = createContext([]);

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
        <LoginContext.Provider value={{isLoged, setIsLoged, userData, setUserData, isLoaded, setLoaded}}>
            {
                isLoged ? <>
                    <Navigation />
                    <div className='content '>
                        <Outlet />
                        { !userData.is_admin && <Footer/> }
                    </div>

                  
                    
                </> : <div className='content '>
                    <Outlet />
                </div>

            }

        </LoginContext.Provider>
    </>)
}