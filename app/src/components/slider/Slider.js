import React, { useContext, useEffect, useState } from "react";

import MovieCard from "../movieCard/MovieCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay, FreeMode } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import "./slider.css";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../loader/Loading";

//Contexts
import WindowSizeContext from "../../contexts/windowSize/WindowSize";

const Slider = (props) => {
  
  const { data, error, loading } = useFetchData(props.url);

  const { windowSize, setWindowSize } = useContext(WindowSizeContext);

  const [navigation, setNavigation] = useState(false);
  const [freeMode, setFreeMode] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(7);

  useEffect(() => {
    const handleWindowResize = () => {
      console.log(window.innerWidth, window.innerHeight);
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    const isMobile = windowSize[0] < 768;
    const slidesPerView = isMobile ? "auto" : 7;

    setNavigation(!isMobile);
    setFreeMode(isMobile);
    setSlidesPerView(slidesPerView);

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
    // eslint-disable-next-line
  }, [windowSize]);

  return (
    <>
      {error && <h1>Error</h1>}
      {loading ? (
        <div
          style={{
            minHeight: "350px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      ) : (
        data && (
          <Swiper
            spaceBetween={20}
            speed={800}
            autoplay={{
              delay: "5000000000",
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              876: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              1024: {
                slidesPerView: 6,
                slidesPerGroup: 6,
              },
              1200: {
                slidesPerView: 7,
                slidesPerGroup: 7,
              },
            }}
            keyboard={{ enabled: true }}
            rewind={true}
            modules={[FreeMode, Keyboard, Navigation, Autoplay]}
            navigation={navigation}
            freeMode={freeMode}
            slidesPerView={slidesPerView}
            className="mySwiper"
          >
            {data.map((movie, index) => {
              return (
                <SwiperSlide key={movie.id}>
                  <MovieCard
                    movie={movie}
                    lazy={index > 7}
                    width={windowSize[0] < 768 ? "130px" : "100%"}
                    // height={windowSize[0] < 768 ? "0px" : "auto"}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )
      )}
    </>
  );
};

export default Slider;
