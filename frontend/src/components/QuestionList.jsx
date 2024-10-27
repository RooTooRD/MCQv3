import React, {useState} from 'react'

function QuestionList({data, goTo}) {
    const [questionListOpened, setQuestionListOpened] = useState(false)
    const [selected, setSelected] = useState(0)

    const handleClick = (index) => {
        setSelected(index)
        goTo(index)
    }
    return (
      
      <div>
        <nav className={`  bg-white z-50 fixed w-[300px] top-0 h-screen 
                      shadow-2xl  transition-all duration-300 
                      ${questionListOpened ?
                          `right-0` :
                          `-right-[300px]`
                      }
                      `}>
                          {/* nav triggenr btn */}
                          <div className='mnav_close-btn bg-accent-secondary w-8 h-8 relative right-8 top-8
                          flex justify-center items-center rounded-tl-lg rounded-bl-lg
                          cursor-pointer transition-all'>
  
                              <i class={`mnav__close-btn  text-2xl text-white 
                              ${questionListOpened ?
                                  `ri-arrow-left-s-line`:
                                  `ri-arrow-right-s-line`
                              }`}
                              onClick={() => 
                                  setQuestionListOpened(!questionListOpened)
                              }></i>
                          </div>
                          
                          {/* logo, list, form */}
                          <div className='p-6  flex flex-col gap-y-6 lg:gap-y-12 h-full '>
                              
                              <div className='flex flex-col gap-y-4 overflow-scroll   custom-scrollbar'>
                                <h3 className='h3 text-center'>Progression</h3>
                                {data.map((item, index) => ( 
                                    <div key={`${index}`} className={`rounded-full hover:bg-grey cursor-pointer border-2 p-1 text-center 
                                        ${selected == index ?
                                            `border-accent text-accent`:
                                            ``
                                        }`}
                                    onClick={() => handleClick(index)}>
                                        <p>question {index + 1}</p>
                                    </div>
                                ))}
                              </div>
                          </div>
                      </nav>
      </div>
    )
}

export default QuestionList
