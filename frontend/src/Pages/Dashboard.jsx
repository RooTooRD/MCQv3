import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import MobileSideBar from '../components/mobile/MobileSideBar';
import Home from './Home';
import Quiz from './Quiz';
import LoadingPage from "./LoadingPage";
import LoadingRender from '../Pages/LoadingRender';
import QuestionContent from '../components/QuestionContent';
import MainContainer from '../components/MainContainer';
import { MenuBtnContext } from '../components/common/MenuBtnContext';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Logout() {
    localStorage.clear();
    return <Navigate to='/login' />;
}

function QuizWrapper() {
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
                <MobileSideBar />
                <Routes>
                    <Route path='/' element={
                        <LoadingRender url='/api/statistic' key='statistic'>
                            <Home />
                        </LoadingRender>
                    } />
                    <Route path='quiz' element={
                        <LoadingRender url='/api/quizzes' key='quiz'>
                            <Quiz />
                        </LoadingRender>
                    } />
                    <Route path='quiz/:code' element={<QuizWrapper />} />
                    <Route path='logout' element={<Logout />} />
                    <Route path='*' element={<LoadingPage />} />
                </Routes>
            </div>
        </MenuBtnContext>
    );
}

export default Dashboard;
