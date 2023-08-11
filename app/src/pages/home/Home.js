import React from 'react'
import './home.css'
import SliderContainer from '../../components/sliderContainer/SliderContainer'
import TabNavigation from '../../components/tabNavigation/TabNavigation'
import Carousel from '../../components/carousel/Carousel'

const Home = () => {
  return (
    <div className='home'>

      <Carousel />

      <SliderContainer title={'Trending'} />
      <SliderContainer title={'Now Playing'} />
      <SliderContainer title={'Top Rated'} />

      <TabNavigation />
    </div>
  )
}

export default Home