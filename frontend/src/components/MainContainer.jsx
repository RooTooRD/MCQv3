import React, {useState} from 'react'
import Header from './common/Header'
import { MenuBtnContext } from './common/MenuBtnContext'


function MainContainer({children}) {

  // 1 -> list
  // 0 -> counter
  const [type, setType] = useState(1)


  // functions
  const handleType = () => {
    setType(!type)
  }


  

  return (
    <div className='w-full items-center h-screen bg-grey flex-shrink-1 overflow-y-scroll  p-2 lg:p-6 custom-scrollbar '>
      
          <Header handleType={handleType} type={type} />
          {React.cloneElement(children, { type})}
     
    </div>
  )
}

export default MainContainer
