import React from 'react'

import MovieCard from '../movieCard/MovieCard'
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import './slider.css'
import useFetchData from '../../hooks/useFetchData';
import Loading from '../loader/Loading';

const Slider = (props) => {

  const {data , error , loading} = useFetchData(props.url);

  return (
    <>
      {error && <h1>Error</h1>}
      {loading ? <Loading/> : data && <Swiper
        spaceBetween={20}
        speed={800}
        autoplay={
            {
                delay: '5000000000',
                disableOnInteraction: false
            }
        }
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 15,
            slidesPerGroup: 2
          },
          576 : {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup:3
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup:4
          },
          876: {
            slidesPerView: 5,
            slidesPerGroup:5
          },
          1024: {
            slidesPerView: 6,
            slidesPerGroup:6
          },
          1200: {
            slidesPerView: 7,
            slidesPerGroup: 7
          }
        }}
        keyboard={{ enabled: true }}
        rewind={true}
        navigation={true}
        modules={[Keyboard, Navigation, Autoplay]}
        className="mySwiper"
      >
        {
          data['results'].map((movie) => {
            return <SwiperSlide key={movie.id}>
                <MovieCard movie={movie}/>
              </SwiperSlide>
          })
        }
      </Swiper>}
    </>
  )
}

export default Slider