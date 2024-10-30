import React, { useState } from 'react'
import Logo from '../assets/img/Logo.svg'
import MobileNav from '../components/mobile/MobileNav'
import DesktopNav from '../components/DesktopNav'
import Hero from '../assets/img/hero.png'
import Services from '../assets/img/services.svg'

function LandingPage() {
    

  return (
            
        <div className='hide-scrollbar'>
        {/* header */}
        <header className='py-3 lg:pt-6 lg:pb-14 '>
            <div className='container mx-auto lg:relative flex flex-col lg:flex-row
            lg:justify-between gap-y-4 lg:gap-y-0'>
                {/* logo */}
                <div className='flex justify-center lg:justify-normal'>
                    <a href='/'>
                        <img  src={Logo}  />
                    </a>
                </div>

                <div className='flex flex-col gap-y-4 lg:flex-row lg:gap-x-4 lg:items-center'>
                    {/* location */}
                    <div className='flex justify-center items-center gap-x-2 lg:justify-normal'>
                    <i class="ri-map-pin-2-fill text-2xl text-accent" ></i>
                    <div className='text-secondary'>ISM, Batna</div>
                    </div>
                    
                    {/* btn */}
                    <a href='/login'>
                    <div className='btn btn-sm cursor-pointer btn-outline w-[240px] lg:w-auto mx-auto lg:mx-0'
                    >Se connecter
                    </div>
                    </a>
                    

                    {/* mobile nav */}
                    
                    <DesktopNav />
                    <MobileNav />
                    
                </div>
            </div>
        </header>
        
        {/* hero */}
        <section id='hero' className='bg-grey py-12 xl:pb-0 mb-12 overflow-hidden '>
            <div className='container mx-auto h-full'>
                {/* text & img */}
                <div className='flex flex-col xl:flex-row justify-between items-center h-full'>
                    {/* text */}
                    <div className='hero__text xl:w-[48%] text-center xl:text-left'>

                        {/* badge */}
                        <div className='flex items-center bg-white py-[10px] px-[20px] w-max gap-x-2
                        mb-[26px] rounded-full mx-auto xl:mx-0'>
                            {/* bage icon */}
                            <i class="ri-heart-pulse-line text-2xl text-accent"></i>
                            <div className='uppercase text-base font-mebium text-[#9ab4b7 tracking-2.24px]' >Live your life</div>
                        </div>

                        {/* title */}
                        <h1 className='h1 mb-6'>Augmentez vos notes avec plus de  <span className='text-accent'>QCMs</span></h1>

                        {/* description */}
                        <div className='mb-[42px] text-2xl md:max-w-xl'>
                        <span className='text-accent-secondary'>Hakim </span>La plateforme contenant le plus de QCMs pour tous les étudiants de médecine                            </div>

                        {/* button */}
                        <a href="/register">
                        <button className='btn btn-sm btn-accent mx-auto xl:mx-0'>Commencer</button>
                        </a>
                        
                    </div> 

                    {/* image */}
                    <div className='hero__img hidden xl:flex max-w-[814px]' >
                        <img src={Hero} alt="" />
                    </div>
                </div>
            </div>
        </section>

        {/* stats */}
        <section id='stats' >
            <div className="countainer mx-auto mb-12">
                {/* wrapper */}
                <div className='flex flex-col xl:flex-row gap-y-6 justify-between'>

                    {/* item */}
                    <div className='stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px font-semibold text-accent-teritary'>+20K</div>
                        <div>Question</div>
                    </div>

                    {/* item */}
                    <div className='stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px font-semibold text-accent-teritary'>+20K</div>
                        <div>Question</div>
                    </div>

                    {/* item */}
                    <div className='stats__item flex-1 xl:border-r flex flex-col items-center'>
                        <div className='text-4xl xl:text-[64px font-semibold text-accent-teritary'>+20K</div>
                        <div>Question</div>
                    </div>

                    
                </div>
            </div>
        </section>



        {/* services */}
        <section id='secrvices'>
            
            <div style={{ backgroundImage: `url(${Services})` }} 
            className="bg-cover bg-no-repeat max-w-[1466px] mx-4 xl:mx-auto rounded-[20px]
            xl:pt-[70px]  px-6 xl:px-0 relatvie h-[368px] flex items-center 
            xl:items-start -z-10 mb-20">
                <div className='container mx-auto'>

                    {/* text */}
                    <div
                    className='services__top flex items-center flex-col xl:flex-row 
                    xl:mb-[60px]'>
                        <h2 className='h2 text-white flex-1 mb-4 xl:mb-0 text-center '>La meilleure façon d'étudier</h2>
                        <p className='text-white xl:hidden flex-1 text-center  max-w-2xl'>
                        Notre solution permet un meilleur apprentissage rapide et efficace avec les meilleures techniques et les meilleurs QCMs                        </p>
                    </div>
                </div>
            </div>

            {/* grid container */}
            <div className="container xl:mb-[50px] mx-auto mt-9 xl:-mt-[144px] ">
                {/* grid */}
                <div className='grid xl:grid-cols-4 gap-5 px-8 xl:px-0'>

                    {/* grid item */}
                    <div className='services__item bg-white p-[30px] ronuded-[10px] shadow-custom2
                    min-h-[288px] flex flex-col items-center text-center '>
                        {/* grid item icon */}
                        <div className='mb-[15px] w-12 h-12'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' viewBox="0 0 24 24" fill="currentColor"><path d="M17 2V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7V2H17ZM7 6H5V20H19V6H17V8H7V6ZM9 16V18H7V16H9ZM9 13V15H7V13H9ZM9 10V12H7V10H9ZM15 4H9V6H15V4Z"></path></svg>
                        </div>

                        {/* grid item title */}
                        <h3 className="h3 mb-[10px] ">Les QCMs </h3>

                        {/* grid item description */}
                        <p className='ont-light leading-normal max-w-[300px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, nulla.</p>

                    </div>

                    {/* grid item */}
                    <div className='services__item bg-white p-[30px] ronuded-[10px] shadow-custom2
                    min-h-[288px] flex flex-col items-center text-center '>
                        {/* grid item icon */}
                        <div className='mb-[15px]'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' viewBox="0 0 24 24" fill="currentColor"><path d="M4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H14C14.5523 21 15 20.5523 15 20V15.2973L15.9995 19.9996C16.1143 20.5398 16.6454 20.8847 17.1856 20.7699L21.0982 19.9382C21.6384 19.8234 21.9832 19.2924 21.8684 18.7522L18.9576 5.0581C18.8428 4.51788 18.3118 4.17304 17.7716 4.28786L14.9927 4.87853C14.9328 4.38353 14.5112 4 14 4H10C10 3.44772 9.55228 3 9 3H4ZM10 6H13V14H10V6ZM10 19V16H13V19H10ZM8 5V15H5V5H8ZM8 17V19H5V17H8ZM17.3321 16.6496L19.2884 16.2338L19.7042 18.1898L17.7479 18.6057L17.3321 16.6496ZM16.9163 14.6933L15.253 6.86789L17.2092 6.45207L18.8726 14.2775L16.9163 14.6933Z"></path></svg>
                        </div>

                        {/* grid item title */}
                        <h3 className="h3 mb-[10px] ">Les Cours Organiser</h3>

                        {/* grid item description */}
                        <p className='ont-light leading-normal max-w-[300px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, nulla.</p>

                    </div>

                    {/* grid item */}
                    <div className='services__item bg-white p-[30px] ronuded-[10px] shadow-custom2
                    min-h-[288px] flex flex-col items-center text-center '>
                        {/* grid item icon */}
                        <div className='mb-[15px]'>
                            <i class="ri-home-office-fill"></i>
                        </div>

                        {/* grid item title */}
                        <h3 className="h3 mb-[10px] ">General Practitionners</h3>

                        {/* grid item description */}
                        <p className='ont-light leading-normal max-w-[300px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, nulla.</p>

                    </div>

                    {/* grid item */}
                    <div className='services__item bg-white p-[30px] ronuded-[10px] shadow-custom2
                    min-h-[288px] flex flex-col items-center text-center '>
                        {/* grid item icon */}
                        <div className='mb-[15px]'>
                            <i class="ri-home-office-fill"></i>
                        </div>

                        {/* grid item title */}
                        <h3 className="h3 mb-[10px] ">General Practitionners</h3>

                        {/* grid item description */}
                        <p className='ont-light leading-normal max-w-[300px]'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, nulla.</p>

                    </div>

                    
                </div>
            </div>
        </section>


       {/* fotter  */}
       <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MediQuiz</h3>
              <p className="text-sm">Empowering medical education through interactive MCQs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Linkas</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-blue-400">Home</a></li>
                <li><a href="#services" className="text-sm hover:text-blue-400">Services</a></li>
                <li><a href="#pricing" className="text-sm hover:text-blue-400">Pricing</a></li>
                <li><a href="#" className="text-sm hover:text-blue-400">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="text-sm hover:text-blue-400">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-blue-400">Twitter</a></li>
                <li><a href="#" className="text-sm hover:text-blue-400">Facebook</a></li>
                <li><a href="#" className="text-sm hover:text-blue-400">aedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} MediQuiz. All rights reserved.</p>
          </div>
        </div>
      </footer>


        </div>

        
        
    
  )
}

export default LandingPage
