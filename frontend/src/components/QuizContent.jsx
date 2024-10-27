import React, {useEffect, useState} from 'react'
import QuizCard from './QuizCard'
import QuizDialog from './QuizDialog';
import LoadingRender from '../Pages/LoadingRender';

function QuizContent({data}) {

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState(data)


  // functions
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const updateData = (new_data) => {
    setQuizzes(prevQuizzes => [...prevQuizzes, new_data]);
  }


  const handleCreate = () => {
    setIsDialogOpen(true);
  };

  
  

 
  
  return (
    <div>
      <button className='bg-accent rounded-lg py-1 px-2 text-white mb-4'
      onClick={() => handleCreate()}>+ crée</button>
    <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      
      {
        quizzes.map((item, index) => (
          <>
          <QuizCard data={item} key={`${index}-${item.id}`}/>
          </>
        ))
      }

      
      
    </div>
    {isDialogOpen && (
      <LoadingRender url='/api/categories'>
        <QuizDialog  closeDialog={closeDialog} updateData={updateData}/>
      </LoadingRender>
      )}
    </div>
  )
}

export default QuizContent
