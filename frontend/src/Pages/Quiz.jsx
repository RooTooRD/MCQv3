import React, { useEffect } from 'react'
import MainContainer from '../components/MainContainer'
import QuizContent from '../components/QuizContent'

function Quiz({data}) {


  return (
    <>
    <MainContainer>
        <QuizContent data={data}></QuizContent>
    </MainContainer>
    </>
  )
}

export default Quiz
