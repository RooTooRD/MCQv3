import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function QuizCard({data}) {

    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [id, setId] = useState('')
    const navigate = useNavigate(); // Use useNavigate hook for navigation
    const [pourcentage, setPourcentage] = useState(0)

  useEffect(() => {
    
    
    const [createdDate, other] = data.created.split("T");
    const [createdTime] = other.split('.');
    setId(data.id);
    setDate(createdDate);
    setTime(createdTime);
    setPourcentage(((data.correctNumber + data.wrongNumber) / data.questionNumber) * 100)

  }, [data]);
  return (
    <div className='bg-white p-8 rounded-lg flex flex-col justify-between space-y-1'>
        <div className='h3'>{data.name}</div>
        <div>{date}  {time}</div>
        <div>{pourcentage} %</div>
        <button className='bg-green-500 py-1 px-4 rounded-xl text-white text-center'
        onClick={() => navigate(`/dashboard/quiz/${id}`)}>play</button>
      </div>
  )
}

export default QuizCard
