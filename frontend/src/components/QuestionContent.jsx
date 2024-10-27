import React, { useEffect, useState } from 'react'
import QuestionCard from './QuestionCard'
import QuestionList from './QuestionList'
import LoadingPage from '../Pages/LoadingPage'
import ErrorBoundary from './ErrorBoundary';


function QuestionContent({ data, type }) {

  const [counter, setCounter] = useState(0)
  
  const plusCounter = () => {
    if (counter < data.length - 1) {
      setCounter(counter + 1)
    }

    
  }

  const minusCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
    console.log(counter)
  }

  const goTo = (index) => {
    setCounter(index)
  }


 useEffect(() => {
  console.log(data)
 }, [])


  return (
   

    
<ErrorBoundary>
 
          {type ?

            <div className='  flex p-8  flex-col space-y-6 justify-center items-center'>
             
              {/* <QuestionList data={data} goTo={goTo} /> */}
              <QuestionCard question={data[counter]} />
              <div className='-translate-x-[5%] flex justify-between items-center bottom-16 left-20 h-20 w-[80%]'>

                <div className='bg-white p-2 rounded-full shadow-custom1 
            hover:scale-105 hover:bg-grey cursor-pointer '
                  onClick={() => minusCounter()}>
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-12 h-12 text-accent' viewBox="0 0 24 24" fill="currentColor"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg>
                </div>

                <div className='bg-white p-2 rounded-full shadow-custom1 
            hover:scale-105 hover:bg-grey cursor-pointer'
                  onClick={() => plusCounter()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className='w-12 h-12 text-accent' viewBox="0 0 24 24" fill="currentColor"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg>
                </div>
              </div>


            </div>
            :

            <div className='flex  w-full h-20 flex-col space-y-12'>
              <QuestionList data={data} goTo={goTo} /> 
              {data.map((item, index) => (
                <>
                
                <QuestionCard key={index} question={item} /> 
                </>
              ))}
            </div>
        

          

        

      }
  
  </ErrorBoundary>  


  )
}

export default QuestionContent
