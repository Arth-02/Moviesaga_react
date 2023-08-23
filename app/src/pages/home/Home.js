import React from 'react'
import './home.css'
import SliderContainer from '../../components/sliderContainer/SliderContainer'
import TabNavigation from '../../components/tabNavigation/TabNavigation'
import Carousel from '../../components/carousel/Carousel'
import TrailerSection from '../../components/trailerSection/TrailerSection'

const Home = () => {
  return (
    <div className='home'>

      <Carousel />

      <SliderContainer title={'Trending'} />
      <SliderContainer title={'Now Playing'} />

      <TabNavigation />

      <TrailerSection />

      <SliderContainer title={'Top Rated'} />
      
    </div>
  )
}

export default Home