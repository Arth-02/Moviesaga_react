import React from "react";
import "./carousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import useFetchData from "../../hooks/useFetchData";

const Carousel = () => {
  const image_base_url = "https://image.tmdb.org/t/p";
  const image_size = "w1920_and_h800_multi_faces";

  const { data } = useFetchData(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN&api_key=ace3eeed99f6d9d19e61456a520cda0b"
  );

  return (
    <section className="slider-container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper carousel"
      >
        {console.log(data)}
        {data &&
          data.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div
                  className="swiper-lazy carousel-background-img"
                  style={{
                    backgroundImage: `url(${image_base_url}/${image_size}${item.backdrop_path})`,
                  }}
                >
                  <div className="backdrop-content">
                    <h1>{item.title}</h1>
                    <p>{item.overview}</p>
                    <div className="rating">
                      <span className="rating-text">Rating</span>
                      <span className="rating-value">{item.vote_average}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </section>
  );
};

export default Carousel;
