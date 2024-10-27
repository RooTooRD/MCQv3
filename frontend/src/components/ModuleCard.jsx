import React from 'react'
import { useNavigate } from 'react-router-dom'

function ModuleCard({module}) {
    // states
    const navigate = useNavigate()

  return (
    <div className='bg-white cursor-pointer p-8 rounded-lg flex flex-col justify-between space-y-1'
    onClick={() => navigate(`/dashboard/quizzes/${module.id}`)}>
        <div className='h2 text-center '>{module.name}</div>

      </div>
  )
}

export default ModuleCard
