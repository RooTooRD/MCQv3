import React, { useEffect, useState } from 'react'
import api from '../js/api'

function QuizDialog({ closeDialog, data, updateData }) {
    // states
    const [name, setName] = useState('')
    const [random, setRandom] = useState(true)
    const [number, setNumber] = useState(25)
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const [displayedSubCategories, setDisplayedSubCategories] = useState([])
    const [selectedQuestionsNumber, setSelectedQuestionsNumber] = useState(0)

    const [moduleSearch, setModuleSearch] = useState('')

    // functions
    const handleName = (e) => { 
        setName(e.target.value)
    }
    
    const handleRandom = () => {
        setRandom(prev => !prev); // Toggle the random state
    }

    const handleNumber = (e) => {
        console.log(e.target.value)
        setNumber(parseInt(e.target.value, 10))
        
    }

    const handleSearch = (e) => {

    }

    const handleSubCategoryChecked = (e) => {
        const count = e.target.getAttribute('questions-count')
        const id = e.target.value
        
        if (!selectedSubCategories.includes(id)) {
            
            setSelectedSubCategories(prevIds => [...prevIds, id])
            setSelectedQuestionsNumber(parseInt(selectedQuestionsNumber) + parseInt(count))
        } 
        else {
            setSelectedSubCategories(prevIds => prevIds.filter(ids => ids !== id))
            setSelectedQuestionsNumber(parseInt(selectedQuestionsNumber) - parseInt(count))

        }
        
    }

    const handleCategoryChecked = (e, category) => {
        if (e.target.checked) {
            // If checked, add subcategories
            category.subcategories.forEach(subcategory => {
                if (!displayedSubCategories.includes(subcategory)) {
                    setDisplayedSubCategories(prev => [...prev, subcategory]);
                }
            });
        } else {
            // If unchecked, remove subcategories
            category.subcategories.forEach(subcategory => {
                setDisplayedSubCategories(prev => prev.filter(prevSub => prevSub !== subcategory));
            });
        }
    };

    const handleSubmit = async () => {
        const quizData = {
            'name': name,
            'questionNumber': number,
            'random': random,
            'subcategories': selectedSubCategories,
        };

        try {
            const response = await api.post('/api/quizzes/', quizData);
            console.log('Quiz created successfully:', response.data);
            updateData(response.data)
            closeDialog();
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
        
    };


    // effects
    useEffect(() => {
        function formatDateTime(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
        
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }

        const now = new Date();
        const formattedDateTime = formatDateTime(now);
        setName(`Révision du (${formattedDateTime})`)
    }, [])



    return (
        <div className="fixed inset-0 z-50 p-8 flex items-center justify-center text-base lg:text-lg bg-black bg-opacity-50">
            <div className="bg-white h-full lg:h-auto w-full lg:w-2/3 p-5 rounded-2xl shadow-lg flex flex-col gap-2">
                <h2 className="text-lg font-bold">Create Quiz</h2>
                <label htmlFor="quiz-name">Nom :</label>
                <input 
                    type="text" 
                    id='quiz-name' 
                    placeholder='name'
                    onChange={handleName} 
                    value={name} 
                    className='outline-none border p-2 rounded-sm border-[#3333]'
                />

                <div className='flex flex-col lg:flex-row gap-2 lg:gap-2 justify-between'>
                    
                        
                        
                    
                    <div className='flex-1 flex flex-col gap-1 p-2'>
                        <div className='px-2'>Modules</div>
                        <input type="text" name="" placeholder='Recherche' 
                        onChange={handleSearch}
                        className='outline-none border border-[#3333] p-2 rounded-sm' id="" />
                        <div className='overflow-y-scroll border border-[#3333] rounded-lg custom-scrollbar h-40 lg:h-56  flex flex-col gap-1'>
                              {   
                                    data.map((category, index) => (
                                        <div className='flex  gap-1 p-1 hover:bg-grey duration-300'>
                                        <div className='hover:bg-gray-300 rounded-full px-1 duration-300'>
                                        <input type="checkbox"
                                        onChange={(e) => handleCategoryChecked(e, category)} />
                                        </div>
                                        
                                        <div>{category.name}</div>
                                        </div>
                                    ))
                                
                                }
                           
                        </div>
                    </div>
                    
                    <div className='flex-1 flex flex-col gap-1 p-2'>
                        <div className='px-2'>Cours</div>
                        <input type="text" name="" placeholder='Recherche' 
                        className='outline-none border border-[#3333] p-2 rounded-sm' id="" />
                        <div className='overflow-y-scroll border border-[#3333] rounded-lg custom-scrollbar h-40 lg:h-56  flex flex-col gap-1'>
                              {   
                                
                                    displayedSubCategories.map((subcategory, index) => (
                                        
                                        <div key={`${index}-${subcategory.id}`} className='flex  gap-1 p-1 hover:bg-grey duration-300'>
                                        <div className='hover:bg-gray-300 rounded-full px-1 duration-300'>
                                        <input type="checkbox" 
                                         questions-count={subcategory.questionCount}
                                         value={subcategory.id}
                                         onChange={handleSubCategoryChecked}  />
                                        </div>
                                        
                                        <div>{subcategory.name}</div>
                                        </div>
                                        ))
                                        

                                    
                                }
                           
                        </div>
                    </div>
                </div>
                <div>
                    Questions : {selectedQuestionsNumber}
                </div>

                <div className='flex items-center gap-4'>
                    <label htmlFor="">Mélanger les questions :</label>
                    <input 
                        type="checkbox"
                        
                        checked={random}
                        className="hidden  peer"
                    />
                    <div onClick={() => handleRandom()}
                    className={`w-5 h-5 lg:w-6 lg:h-6 cursor-pointer  duration-300 border-2 border-[#3333] rounded-full flex items-center justify-center
                        hover:bg-gray-400 group-hover:border-white peer-checked:bg-accent`}>
                        {random && (
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className='text-white' 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="9" x2="15" y1="15" y2="9"/>
                            </svg>
                        )}
                    </div>
                </div>
                {/* Select Dropdown for Limits */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="limit-select">Nombre de questions :</label>
                    <select
                        id="limit-select"
                        value={number}
                        onChange={handleNumber}
                        className="border p-2 rounded outline-none"
                    >
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="150">150</option>
                        <option value="0">No Limit</option>
                    </select>
                </div>
                <button 
                    className='mt-4 bg-green-500 text-white py-1 px-3 rounded' 
                    onClick={handleSubmit} // Call the handleSubmit function
                >cree</button>
                <button className='mt-4 bg-red-500 text-white py-1 px-3 rounded' onClick={closeDialog}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default QuizDialog;
