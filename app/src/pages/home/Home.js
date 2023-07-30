import React from 'react'
import './home.css'
import SliderContainer from '../../components/sliderContainer/SliderContainer'

const Home = () => {
  return (
    <div className='home'>
      <SliderContainer title={'Trending'} />
      <SliderContainer title={'Now Playing'} />
      <SliderContainer title={'Top Rated'} />
    </div>
  )
}

export default Home