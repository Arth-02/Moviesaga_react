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

const TrailerSection = (props) => {
  const { windowSize } = useContext(WindowSizeContext);

  const { data, loading, error } = useFetchData(props.url);

  if(data?.length === 0){
    return null
  }

  return (
    <>
      {error && <h1>Error</h1>}
      {!loading ? (
        <section className="trailer-section slider-container removeminheight" style={props.space ? {padding: '35px 0px 35px 0px'} : {padding: "0px"}}>
          <div className="title-panel" style={
            props.space ? {marginBottom: "20px"} : {marginBottom: "8px"}
          }>
            <h2 className="heading">
              {props.title}
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
                      youtubeKey={movie.key}
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
