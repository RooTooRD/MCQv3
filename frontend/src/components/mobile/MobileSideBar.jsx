import { LayoutDashboard, List,  GalleryVerticalEnd, FolderPlus, Search, StickyNote, CreditCard, Banknote, User, Menu, LogOut

} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { MyContext } from "../common/MenuBtnContext"

const SIDEBAR_ITEMS = [
   {
       name: 'Tableau de Bord', icon: LayoutDashboard, path: '/dashboard', color: '#6366f1'
   },
   {
       name: 'Mes quiz', icon: List, path: '/dashboard/quiz', color: '#885CF6'
   },
   {
       name: 'Mes Playlists', icon: GalleryVerticalEnd, path: '/dashboard/playlists', color: '#EC4899'
   },
   {
       name: 'Creer quiz', icon: FolderPlus, path: '/dashboard/add_quiz', color: '#108981'
   },
   {
       name: 'Recherche', icon: Search, path: '/dashboard/search', color: '#F59E0B'
   },
   {
       name: 'Remarque', icon: StickyNote, path: '/dashboard/note', color: '#3BB2F6'
   },
   {
       name: 'Abonnements', icon: CreditCard, path: '/dashboard/subscription', color: '#6366f1'
   },
   {
       name: 'Mon Abonnement', icon: Banknote, path: '/dashboard/my_subscription', color: '#6366f1'
   },
   {
       name: 'Profile', icon: User, path: '/dashboard/profile', color: '#6366f1'
       
   },
   {
    name: 'Deconixion', icon: LogOut, path: '/dashboard/logout', color: '#F59E0B'
   }
   
]

function MobileSideBar() {
    const {isSideBarOpen, setIsSideBarOpen} = useContext(MyContext)
    const [selected, setSelected] = useState(SIDEBAR_ITEMS[0])

    // functions
    const handleSelected = (item) => {
        setSelected(item)
    }
    return (
    

        <div>
      <nav className={`mnav pt-12 z-50 bg-white fixed w-[300px] top-0 h-screen 
                    shadow-2xl lg:hidden transition-all duration-300 z-20 
                    ${isSideBarOpen ?
                        `left-0` :
                        `-left-[300px]`
                    }
                    `}>
                        {/* nav triggenr btn */}
                        { /*
                        <div className='mnav_close-btn bg-primary w-8 h-8 relative -right-full top-8
                        flex justify-center items-center rounded-tr-lg rounded-br-lg
                        cursor-pointer transition-all'>

                            <i class={`mnav__close-btn  text-2xl text-white 
                            ${isSideBarOpen ?
                                `ri-arrow-right-s-line`:
                                `ri-arrow-left-s-line`
                            }`}
                            onClick={() => 
                                setIsSideBarOpen(!isSideBarOpen)
                            }></i>
                        </div> */}
                        
                        {/* logo, list, form */}
                        <div className='px-4 flex flex-col gap-y-4 h-full '>
                        {SIDEBAR_ITEMS.map((item, index) => (
                    <Link key={item.path} to={item.path}>
                        <motion.div className={`flex items-center h-12 p-4 mb-2 font-medium rounded-lg text-primary transition-colors
                        hover:bg-accent-special 
                        ${selected == item ?
                            ` bg-accent-special border-2 border-accent-secondary text-accent-secondary`:
                            ``
                        }`}
                        onClick={() => { 
                            setIsSideBarOpen(false)
                            handleSelected(item)

                         }}>
                            <item.icon size={20} style={{color: item.color, minWidth: '20px'}}  />

                            <AnimatePresence>
                                {isSideBarOpen && (
                                    <motion.span 
                                        className="ml-4 whitespace-nowrap  "
                                        initial={{opacity: 0, width:0 }}
                                        animate={{opacity: 100, width: 'auto'}}
                                        exit={{ opacity: 0, width: 0}}
                                        transition={{duration:0.3, delay:0.3}}
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Link>

                    
                ))}

                        </div>
                    </nav>
    </div>
    
)
}

export default MobileSideBar
