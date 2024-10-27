import React, { useEffect } from 'react'
import ModuleCard from './ModuleCard'
function ModulesList({data}) {

    useEffect(() => {
        console.log(data)
    }, [])
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {
        data.map((item, index) => ( 
           <ModuleCard module={item} />
        ))
      }
    </div>
  )
}

export default ModulesList
