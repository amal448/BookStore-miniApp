import React from 'react'
import Banner from '../components/Banner'
import TopSelling from '../components/TopSelling'
import Recommended from '../components/Recommended'
import News from '../components/News'

const Home = () => {
  return (
   <>
    <Banner />
    <TopSelling />
    <Recommended />
    <News />
   </>
  )
}

export default Home