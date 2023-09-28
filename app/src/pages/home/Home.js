import React from 'react'
import './home.css'
import SliderContainer from '../../components/sliderContainer/SliderContainer'
import TabNavigation from '../../components/tabNavigation/TabNavigation'
import Carousel from '../../components/carousel/Carousel'
import TrailerSection from '../../components/trailerSection/TrailerSection'

const Home = () => {

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=ace3eeed99f6d9d19e61456a520cda0b&include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-08-22&sort_by=popularity.desc";

  return (
    <div className='home'>

      <Carousel />

      <SliderContainer title={'Trending'} />
      <SliderContainer title={'Now Playing'} />

      <TabNavigation />

      <TrailerSection url={url} title={'Upcoming Movies'} space={true} />

      <SliderContainer title={'Top Rated'} />
      
    </div>
  )
}

export default Home