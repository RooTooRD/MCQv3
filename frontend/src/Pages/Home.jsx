import React from 'react'
import MainContainer from '../components/MainContainer'
import Statistic from '../components/Statistic'

function Home({ data }) {






  return (
    <>

      <MainContainer>
        <Statistic data={data}/>
      </MainContainer>

    </>

  )
}

export default Home
