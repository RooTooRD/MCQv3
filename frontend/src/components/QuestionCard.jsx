import React, { useEffect, useState } from 'react'
import api from '../js/api'

function QuestionCard({question}) {

  const map = {
    "0" : "A",
    "1" : "B", 
    "2" : "C",
    "3" : "D",
    "4" : "E",
    "5" : "F"
  }

    // state
    const [selected, setSelected] = useState([])
    const [noteSelecteCorrect, setNotSelectedCorrect] = useState([])
    const [selectedCorrect, setSelectedCorrect] = useState([])
    const [selectedFalse, setSelectedFalse] = useState([])
    const [answerSaved, setAnswerSaved] = useState()
    const [data, setData] = useState()

    // functions

   
    const handleChecked = (choice) => {
        // Create a new array with the current selections
        const newSelected = [...selected];

        // Add or remove the choiceId based on whether it's already in the array
        if (newSelected.includes(choice)) {
          // Remove the choiceId if it's already selected
          const index = newSelected.indexOf(choice);
          newSelected.splice(index, 1);
        } else {
          // Add the choiceId if it's not already selected
          // console.log(choice)
          newSelected.push(choice);
        }

        // Update the state with the new array
        setSelected(newSelected);
        
        // Log the updated state (note that setSelected is asynchronous)
        
      
    }

    const saveAnswer = async () => {
        console.log(question.id)
        const url = `api/update/${question.id}`
        const data = {
          "id": question.id,
          "isAnswered": true,
          "isAnsweredCorrect":false,
          "choices": []
        }

        selected.forEach((choice) => {
          data['choices'].push({
            "id": choice.id,
            "isSelected": true
          })
        })

        console.log(data)
        try {
          const response = await api.put(url, data);
          setAnswerSaved(true)
        } catch (err) {
          console.log(err)
        } finally {
          
        }

    }

    const verifyAnswer = (shouldSave = true) => {
  
      const newSelectedCorrect = []
      const newSelectedFalse = []
      const newNoteSelecteCorrect = []


      question.choices.map((item) => {
       
        const isSelected = selected.includes(item);


        if ((selected.includes(item) || item.isSelected) && item.isCorrect){
          newSelectedCorrect.push(item)
          

        } else if ((selected.includes(item) || item.isSelected) && !item.isCorrect){
          newSelectedFalse.push(item)
          

        } else if (item.isCorrect){
          newNoteSelecteCorrect.push(item)
          
        }

        

      })

      setSelectedCorrect(newSelectedCorrect);
      setSelectedFalse(newSelectedFalse);
      setNotSelectedCorrect(newNoteSelecteCorrect);

      // Clear the selected choices
      setSelected([]);
      if (shouldSave) {
        saveAnswer()
      }
      
    }

 

    useEffect(() => {
      setAnswerSaved(question.isAnswered)
    if (question.isAnswered){
      const preSelected = question.choices.filter((item) => item.isSelected);
      setSelected(preSelected);

      verifyAnswer(false)
    }
     
      
    }, [question])
    


  return (


    <div className='flex flex-col-reverse lg:flex-row w-full gap-y-4 lg:gap-x-6'>
      <div className='bg-white w-full  h-fit p-4 xl:p-8 rounded-lg shadow-lg flex flex-col space-y-4 lg:space-y-10'>
      <h1 className='text-normal  lg:text-2xl font-semibold'>{question.text}</h1>
      <div>
      <p>module: <span className='text-accent'>{question.category}</span></p>
      <p>cour: <span className='text-accent'>{question.subCategory}</span></p>
      <p>anné - <span className='text-accent'>{question.year}</span></p>
      </div>
      
      <hr />


      <div className='flex flex-col '>
        {question.choices.map((item, index) => (
            
            <div  className={`group flex space-x-4 items-center p-2 rounded-md   
              ${answerSaved ? ` ` : `hover:bg-blue-400 hover:text-white cursor-pointer`}
              ${selectedCorrect.includes(item) || noteSelecteCorrect.includes(item) ? `bg-green-400 text-white` : ``} 
              ${selectedFalse.includes(item) ? `bg-red-400 text-white`: ``}`}>
                {/* <input type='checkbox' className='min-w-6 min-h-6 ' checked={handleChecked(item.id)}/> */}
                {/* <input type='checkbox' className='min-w-6 min-h-6 ' /> */}
                <div className="flex  ">
                  <label className={`relative
                  ${answerSaved ? ` `: `crursor-pointer`} `}>
                    <input type="checkbox" className="hidden peer"
                    checked={selected.includes(item)}
                    onChange={() => handleChecked(item)}
                    disabled={answerSaved}
                     />

                    <div className={`w-10 h-10 border-2  border-gray-600 rounded-full flex items-center justify-center
                      peer-checked:bg-yellow-400 
                      ${answerSaved ? ` ` : `hover:bg-gray-400 group-hover:border-white `}
                      ${selectedCorrect.includes(item) || noteSelecteCorrect.includes(item) ? `bg-green-600 text-white border-white` : ``} 
                      ${selectedFalse.includes(item) ? `bg-red-600 text-white border-white`: ``} `}>
                      
                      <span className={`text-black text-xl peer-checked:text-white group-hover:text-white">{map[index] 
                      ${selectedCorrect.includes(item) || selectedFalse.includes(item) || noteSelecteCorrect.includes(item)  ? ` text-white`: ``}`}>{map[index]}</span>
                    </div>
                  </label>
                </div>
                <p className='text-normal lg:text-xl'>{item.text}</p>
            </div>
        ))}
        </div>


        {/* <div className='flex justify-center hover:scale-105 duration-300' onClick={verifyAnswer}> */}
        <div className='flex justify-center hover:scale-105 duration-300'>
    <button
        className={`bg-green-600 hover:bg-green-300 p-3 rounded-lg text-white font-semibold
          ${answerSaved ? `cursor-not-allowed  bg-green-300`: ``}
        `}
        onClick={() => verifyAnswer()}
        disabled={answerSaved} // This disables the button if answerSaved is true
    >
        Verifier
    </button>
</div>
    </div>

        <div className='w-full lg:w-12 flex gap-x-4 lg:flex-col lg:gap-y-6'>
          <div className='bg-white w-10 h-10 lg:w-auto rounded-full cursor-pointer p-2 shadow-custom1 duration-300 hover:bg-red-600 hover:scale-105 hover:text-white '>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"></path></svg>
          </div>

          <div className='bg-white rounded-full w-10 h-10 lg:w-auto cursor-pointer p-2 shadow-custom1 duration-300 hover:bg-green-600 hover:scale-105 hover:text-white '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15L15 20.996L4.00221 21C3.4487 21 3 20.5551 3 20.0066V3.9934C3 3.44476 3.44495 3 3.9934 3H20.0066C20.5552 3 21 3.45576 21 4.00247V15ZM19 5H5V19H13V14C13 13.4872 13.386 13.0645 13.8834 13.0067L14 13L19 12.999V5ZM18.171 14.999L15 15V18.169L18.171 14.999Z"></path></svg>          </div>

          <div className='bg-white rounded-full w-10 h-10 lg:w-auto cursor-pointer p-2 shadow-custom1 duration-300 hover:bg-yellow-600 hover:scale-105 hover:text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.382 3C12.7607 3 13.107 3.214 13.2764 3.55279L14 5H20C20.5523 5 21 5.44772 21 6V17C21 17.5523 20.5523 18 20 18H13.618C13.2393 18 12.893 17.786 12.7236 17.4472L12 16H5V22H3V3H12.382ZM11.7639 5H5V14H13.2361L14.2361 16H19V7H12.7639L11.7639 5Z"></path></svg>
        </div>

        <div className='bg-white rounded-full w-10 h-10 lg:w-auto cursor-pointer p-2 shadow-custom1 duration-300 hover:bg-purple-600 hover:scale-105 hover:text-white'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2ZM18 4H6V19.4324L12 15.6707L18 19.4324V4Z"></path></svg>
        </div>
        
        </div>

        
    </div>
  )
}

export default QuestionCard
