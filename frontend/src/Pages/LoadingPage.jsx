import React from 'react'
import Loading from '../components/common/Loading'

function NotFound() {
  return (

      
      <div className='flex-1 flex justify-center items-center bg-grey'>
        <div className='flex flex-col items-center justify-center gap-y-6'>
        <h1 className='text-4xl font-semibold '>Loading...</h1>
        <Loading />
        </div>
      
      </div>

  )
}

export default NotFound
