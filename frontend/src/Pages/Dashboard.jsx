import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home"

import LoadingPage from "./LoadingPage"
import LoadingRender from '../Pages/LoadingRender'
import SideBar from '../components/SideBar'
import MobileSideBar from '../components/mobile/MobileSideBar'
import Quiz from './Quiz'
import { useParams } from 'react-router-dom';
import { MenuBtnContext } from '../components/common/MenuBtnContext'
import QuestionContent from '../components/QuestionContent'
import MainContainer from '../components/MainContainer'

function Logout() {
    localStorage.clear()
    return <Navigate to='/login' />
  }

function QuizWrapper() {
    // Extract the quiz code from the URL
    const { code } = useParams();

    return (
      <MainContainer>
        <LoadingRender url={`/api/quizzes/${code}`} key={code}>
            <QuestionContent />
        </LoadingRender>
        </MainContainer>
    );
}




function Dashboard() {
  return (
    <MenuBtnContext>
      <div className='flex h-screen'>
        
          <SideBar />
          <MobileSideBar/>
        
        
        <Routes>
          {/* <Route path='/' element={<LandingPage />} /> */}
          
          <Route path='/' element={
          <LoadingRender url='/api/statistic' key='statistic'>
            <Home />
          </LoadingRender>} />
          
          <Route path='quiz' element={

            <LoadingRender url='/api/quizzes' key='quiz'>
              <Quiz />
            </LoadingRender>
          }/>
{/* 
          <Route path='question' element={

          <LoadingRender url='/api/quizzes/' key='quiz-questions'>
            <Quiz />
          </LoadingRender>
          }/> */}

          <Route path='quiz/:code' element={
                        <QuizWrapper />
                    } />


          <Route path='*' element={<LoadingPage />} />
          <Route path='logout' element={<Logout />} />
        </Routes>

       
      </div>
    </MenuBtnContext>
  )
}

export default Dashboard
