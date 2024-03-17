import { createContext, useState, useEffect } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

import './App.css'
import Login from './auth/login'
import { Layout } from './components/layout'

function App() {

  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<Login />}></Route>
      </Route>

    </Routes>
  )
}





export default App
