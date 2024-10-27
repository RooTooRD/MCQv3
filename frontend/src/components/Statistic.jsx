import React, { useEffect, useState } from 'react'
import LoadingPage from '../Pages/LoadingPage'
function Statistic({ data }) {

    // states
    const [quizsNumber, setQuizsNumber] = useState(0)
    const [answeredQusetionsNumber, setAnsweredQusetionsNumber] = useState(0)
    const [answeredWrongQusetionsNumber, setAnsweredWrongQusetionsNumber] = useState(0)
    const [answeredCorrectQusetionsNumber, setAnsweredCorrectQusetionsNumber] = useState(0)
    

    useEffect(() => { 
        setQuizsNumber(data.quizsNumber || 0);
        setAnsweredQusetionsNumber(data.answeredQuestionsNumber || 0);
        setAnsweredWrongQusetionsNumber(data.answeredWrongQuestionsNumber || 0);
        setAnsweredCorrectQusetionsNumber(data.answeredCorrectQuestionsNumber || 0);       
    }, [data]);

  return (

  
        
        <div className='grid grid-cols-2 gap-4'> 

        <div className='flex flex-col justify-between items-center p-8 shadow-custom2 rounded-lg bg-violet-300'>
          <p className='h3 text-nowrap text-white'>Nombre de Quiz</p>
  
          <div className='text-white h3'>
              {quizsNumber}
          </div>
        </div>
  
        <div className='flex flex-col justify-between items-center p-6 shadow-custom2 rounded-lg bg-blue-300'>
          <p className='h3 text-center text-white'>Question répondue</p>
  
          <div className='text-white h3'>
              {answeredQusetionsNumber}
          </div>
        </div>
  
        <div className='flex flex-col justify-between items-center p-8 shadow-custom2 rounded-lg bg-green-300'>
          <p className='h3 text-center text-white'>Réponses Correctes</p>
  
          <div className='text-white h3'>
              {answeredCorrectQusetionsNumber}
          </div>
        </div>
  
        <div className='flex flex-col justify-between items-center p-8 shadow-custom2 rounded-lg bg-red-300'>
          <p className='h3 text-center text-white'>Réponses Incorrectes</p>
  
          <div className='text-white h3'>
              {answeredWrongQusetionsNumber}
          </div>
        </div>
  
  
      </div>

    

  )
}

export default Statistic
