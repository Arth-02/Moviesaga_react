import React, { useContext } from "react";
import "./trailersection.css";
import useFetchData from "../../hooks/useFetchData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation, Autoplay, FreeMode } from "swiper";

import TrailerCard from "../trailerCard/TrailerCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import Loading from "../loader/Loading";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

//Contexts
import WindowSizeContext from "../../contexts/windowSize/WindowSize";

const TrailerSection = () => {
  const { windowSize } = useContext(WindowSizeContext);

  const url =
    "https://api.themoviedb.org/3/discover/movie?api_key=ace3eeed99f6d9d19e61456a520cda0b&include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2023-08-22&sort_by=popularity.desc";

  const { data, loading, error } = useFetchData(url);

  return (
    <>
      {error && <h1>Error</h1>}
      {!loading ? (
        <section className="trailer-section slider-container">
          <div className="title-panel">
            <h2 className="heading">
              Upcoming Movie's Trailers
              <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
            </h2>
          </div>
          <Swiper
            spaceBetween={20}
            speed={800}
            autoplay={{
              delay: "5000000000",
              disableOnInteraction: false,
            }}
            keyboard={{ enabled: true }}
            rewind={false}
            modules={[FreeMode, Keyboard, Navigation, Autoplay]}
            navigation={windowSize[0] < 768 ? false : true}
            // freeMode={true}
            slidesPerView={"auto"}
            className="mySwiper"
            style={{minHeight: '270px'}}
          >
            {data &&
              data.map((movie, index) => {
                return (
                  <SwiperSlide key={movie.id}>
                    <TrailerCard
                      id={movie.id}
                      title={movie.title}
                      index={index}
                    />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </section>
      ) : (
        <div
          style={{
            minHeight: "270px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default React.memo(TrailerSection);
