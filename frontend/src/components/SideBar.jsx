import { LayoutDashboard, List,  GalleryVerticalEnd, FolderPlus, Search, StickyNote, CreditCard, Banknote, User, Menu, LogOut

} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from "react-router-dom"
import { MyContext } from "./common/MenuBtnContext"

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

function SideBar() {
    const {isSideBarOpen} = useContext(MyContext)
    const [selected, setSelected] = useState()

    // functions
    const handleSelected = (item) => {
        setSelected(item)
        
    }

    
    return (
    <motion.div
        className={` min-h-full hidden  lg:flex z-10 transition-all duration-300 ease-in-out  `}
        animate={{left: isSideBarOpen ? 300: 0}}
        initial={{ left: isSideBarOpen ? 300 : 0 }}
    >
        <div className="h-full overflow-hidden  bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
            {/* <motion.button
                whileHover={{scale: 1.1}}
                whileTap={{ scale: 0.9}}
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
            >
                <Menu size={24} />
            </motion.button> */}

            <nav className="mt-8 flex-grow">
                {SIDEBAR_ITEMS.map((item, index) => (
                    <Link key={item.path} to={item.path}>
                        <motion.div className={`flex items-center h-12 p-4 mb-2 font-medium rounded-lg text-primary transition-colors
                        hover:bg-accent-special 
                        ${selected == item ?
                            ` bg-accent-special border-2 border-accent-secondary text-accent-secondary`:
                            ``
                        }`}
                        onClick={() => handleSelected(item)}>
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

                

            </nav>
        </div>
    </motion.div>
)}

export default SideBar
