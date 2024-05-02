import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import './App.css'
import Login from './auth/login'
import { Layout } from './components/layout'
import Albumes from './pages/Albumes'
import Home from './pages/home'
import Inventario from './pages/Inventario/inventario'
import Perfil from './pages/Perfil/perfil'
import Usuarios from './pages/Usuarios/usuarios'

/**
 * 
 * React-Router
 * @route {/l} Carga el componente <Layout/> que dependiendo de la url carga:
 *  @route {/login} Carga el componente <Login/>
 *  @route {/home} Carga el componente <Home />
 *  @route {/albumes} Carga el componente <Albumes />
 *  @route {/inventario} Carga el componente <Inventario />
 *  @route {/perfil} Carga el componente <Perfil />
 */
function App() {

  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/albumes' element={<Albumes />}></Route>
        <Route path='/inventario' element={<Inventario />}></Route>
        <Route path='/perfil' element={<Perfil />}></Route>
        {/*<Route path='/usuarios' element={<Usuarios />}></Route>*/}
      </Route>

    </Routes>
  )
}





export default App
