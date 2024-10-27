import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./Pages/Login"
import Register from "./Pages/Register"
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import { AnimatePresence } from 'framer-motion'




export default function App() {
  

  return (
    <>
    
    <BrowserRouter>

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='dashboard/*' element={<ProtectedRoute children={<Dashboard />} />} />

        </Routes>

    
 
    </BrowserRouter>
    
   
    
    </>
    

   
  )
}

