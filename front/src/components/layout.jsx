import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export const LoginContext = createContext([]);

export const Layout = () => {
    const [isLoged, setStatedLoged] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {

        if (!isLoged) {

            navigate('/login');
        }
    }, [isLoged]);

    
    return (<>
        <LoginContext.Provider value={[isLoged, setStatedLoged]}>
            <header>header</header>
            <div className='content '>
                <Outlet />
            </div>

            <footer className='footer'>footer</footer>
        </LoginContext.Provider>
    </>)
}