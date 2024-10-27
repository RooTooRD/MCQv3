import React, { useContext, useState } from 'react'
import {motion, useScroll} from 'framer-motion'
import {Menu} from 'lucide-react'
import { MyContext } from './MenuBtnContext'

function Header({ title, handleType, type }) {

  const {isSideBarOpen, setIsSideBarOpen} = useContext(MyContext)

  const handleMenuBtn = () => {
    setIsSideBarOpen(!isSideBarOpen)
    
  }

  return (
    <header className="bg-white sticky z-40 top-0 w-full mb-12 lg:h-16  bg-opacity-50 backdrop-blur-md shadow-lg rounded-full ">
        <div className="max-w-7xl flex  flex-row-reverse lg:flex-row items-center mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{ scale: 0.9}}
                onClick={handleMenuBtn}
                className="p-2  rounded-full hover:bg-gray-700  transition-colors max-w-fit"
            >
                <Menu size={24} style={{color: 'grey'}} />
          </motion.button>
          
          <div className='w-10 h-10 p-2 cursor-pointer rounded-full duration-300 text-white shadow-lg hover:scale-105 
           hover:bg-accent-secondary bg-accent'
          onClick={()=> handleType()}>
          {
            type ?
            <svg xmlns="http://www.w3.org/2000/svg" className='w-fit' viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM8 7H16V9H8V7ZM8 11H16V13H8V11ZM8 15H16V17H8V15Z"></path></svg>

            :
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M0.5 12L5.44975 7.05023L5.44876 11H10V13H5.44826L5.44727 16.9472L0.5 12ZM14 13H18.5501L18.55 16.9492L23.5 11.9995L18.5503 7.04974L18.5502 11H14V13Z"></path></svg>

          }
          </div>
        </div>
    </header>
  )
}

export default Header






