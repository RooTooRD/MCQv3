import React, {useState} from 'react'
import Logo from '../../assets/img/Logo.svg'
function MobileNav() {
    const [mobileNavOpened, setMobileNavOpened] = useState(false)
  return (
    
    <div>
      <nav className={`mnav bg-white fixed w-[300px] top-0 h-screen 
                    shadow-2xl lg:hidden transition-all duration-300 z-20 
                    ${mobileNavOpened ?
                        `left-0` :
                        `-left-[300px]`
                    }
                    `}>
                        {/* nav triggenr btn */}
                        <div className='mnav_close-btn bg-primary w-8 h-8 relative -right-full top-8
                        flex justify-center items-center rounded-tr-lg rounded-br-lg
                        cursor-pointer transition-all'>

                            <i class={`mnav__close-btn  text-2xl text-white 
                            ${mobileNavOpened ?
                                `ri-arrow-right-s-line`:
                                `ri-arrow-left-s-line`
                            }`}
                            onClick={() => 
                                setMobileNavOpened(!mobileNavOpened)
                            }></i>
                        </div>
                        
                        {/* logo, list, form */}
                        <div className='px-12 flex flex-col gap-y-12 h-full '>
                            {/* logo */}
                            <a href="#">
                                <img src={Logo} alt="" />
                            </a>

                            {/* list */}
                            <ul className='flex flex-col gap-y-5'>
                                <li><a href="#" className=' text-secondary hover:text-accent
                                transition-all duration-300 '>Home</a></li>

                                <li><a href="#" className=' text-secondary hover:text-accent
                                transition-all duration-300 '>Doctors</a></li>

                                <li><a href="#" className='text-secondary hover:text-accent
                                transition-all duration-300 '>Services</a></li>

                                <li><a href="#" className='text-secondary hover:text-accent
                                transition-all duration-300 '>Contact</a></li>

                            </ul>

                            {/* form */}
                            <div className='relative flex gap-x-[10px]'>
                                <label for='mnav-search-input'>
                                <i class="ri-search-line text-accent"></i>
                                </label>
                                <input type="text"
                                id='mnva-search-input'
                                placeholder='Search...'
                                className='outline-none w-[160px] border-b-2 focus:border-b-2
                                focus:border-accent placeholder:italic ' />
                            </div>
                        </div>
                    </nav>
    </div>
  )
}

export default MobileNav
