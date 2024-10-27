import React from 'react'

function DesktopNav() {
  return (
    <nav className='bg-white absolute w-fit left-[50%] -translate-x-[50%] -bottom-[86px] shadow-custom1 h-16
    rounded-[10px] hidden lg:flex lg:items-center lg:justify-center lg:px-[50px]'>

      {/* list */}
      <ul className='flex flex gap-x-10'>
                                <li><a href="#" className='border-r pr-4 text-secondary hover:text-accent
                                transition-all duration-300 '>Home</a></li>

                                <li><a href="#" className='border-r pr-4 text-secondary hover:text-accent
                                transition-all duration-300 '>Doctors</a></li>

                                <li><a href="#" className='border-r pr-4 text-secondary hover:text-accent
                                transition-all duration-300 '>Services</a></li>

                                <li><a href="#" className='text-secondary hover:text-accent
                                transition-all duration-300 '>Contact</a></li>

        </ul>

        {/* <form className='relative flex gap-x-[10px]'>
                                <label for='search-input'
                                className='group flex justify-center items-center '>
                                <i class="ri-search-line text-2xl text-accent"></i>
                                </label>
                                <input type="text"
                                id='search-input'
                                placeholder='Search...'
                                className='outline-none w-[100px] focus:w-[180px]
                                focus:border-b-2 focus:border-accent placeholder:italic placeholder:text-base
                                transition-all duration-150 ' />
    </form> */}
    </nav>
  )
}

export default DesktopNav
