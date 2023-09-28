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
import GeneralModal from "../generalModal/GeneralModal";
import { Grow, Zoom } from "@mui/material";

//Contexts
import WindowSizeContext from "../../contexts/windowSize/WindowSize";
import CastCard from "../castCard/CastCard";

const Slider = (props) => {
  const { data, error, loading } = useFetchData(props.url);

  const { windowSize } = useContext(WindowSizeContext);

  const [filteredCast, setFilteredCast] = useState([]);
  const [openImage , setOpenImage] = useState(null);

  const [breakpoints, setBreakpoints] = useState({});

  const setBreakpointsFunc = () => {
    if (props.type === "cast") {
      setBreakpoints({
        768: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        876: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
        1024: {
          slidesPerView: 5,
          slidesPerGroup: 5,
        },
        1200: {
          slidesPerView: 6,
          slidesPerGroup: 6,
        },
      });
    } else if (!props.type) {
      setBreakpoints({
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
      });
    } else if (props.type === "images") {
      setBreakpoints({
        768: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        876: {
          slidesPerView: 4,

          slidesPerGroup: 4,
        },
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      });
    }
  };

  // const breakpoints =
  //   (props.type === "cast")
  //     && {
  //         768: {
  //           slidesPerView: 5,
  //           slidesPerGroup: 5,
  //         },
  //         876: {
  //           slidesPerView: 6,
  //           slidesPerGroup: 6,
  //         },
  //         1024: {
  //           slidesPerView: 5,
  //           slidesPerGroup: 5,
  //         },
  //         1200: {
  //           slidesPerView: 6,
  //           slidesPerGroup: 6,
  //         },
  //       }
  //   (!props.type) && {
  //         768: {
  //           slidesPerView: 4,
  //           slidesPerGroup: 4,
  //         },
  //         876: {
  //           slidesPerView: 5,
  //           slidesPerGroup: 5,
  //         },
  //         1024: {
  //           slidesPerView: 6,
  //           slidesPerGroup: 6,
  //         },
  //         1200: {
  //           slidesPerView: 7,
  //           slidesPerGroup: 7,
  //         },
  //       }
  //   (props.type === "images") && {
  //     768: {
  //       slidesPerView: 2,
  //       slidesPerGroup: 2,
  //     },
  //     876: {
  //       slidesPerView: 3,
  //       slidesPerGroup: 3,
  //     },
  //     1024: {
  //       slidesPerView: 4,
  //       slidesPerGroup: 4,
  //     },
  //     1200: {
  //       slidesPerView: 5,
  //       slidesPerGroup: 5,
  //     },
  //   };

  // useEffect(() => {
  //   const handleWindowResize = () => {
  //     setWindowSize([window.innerWidth, window.innerHeight]);
  //   };

  //   const isMobile = windowSize[0] < 768;
  //   const slidesPerView = isMobile ? "auto" : 7;

  //   setNavigation(!isMobile);
  //   setFreeMode(isMobile);
  //   setSlidesPerView(slidesPerView);

  //   window.addEventListener("resize", handleWindowResize);

  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  //   // eslint-disable-next-line
  // }, [windowSize]);

  useEffect(() => {
    setBreakpointsFunc();
    if (props.type === "cast" && data) {
      setFilteredCast(
        data.cast.filter(
          (cast) => cast.profile_path !== null && cast.order < 15
        )
      );
    }
    // eslint-disable-next-line
  }, [data]);

  // Functions For Modal
  const [modalopen, setModalOpen] = useState(false);
  const handleModalOpen = (e) => {
    setOpenImage(e.currentTarget.id)
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  if (data?.length === 0) {
    return null;
  }

  return (
    <>
      <GeneralModal
        open={modalopen}
        handleClose={handleModalClose}
        title="Images"
      >
        <Zoom in={modalopen} timeout={600}>
        <img src={`https://image.tmdb.org/t/p/w780${openImage}`} alt="open Image" style={{
          objectFit: "contain",
          width: "100%",
        }} />
        </Zoom>
      </GeneralModal>

      {error && <h1>Error</h1>}
      {loading ? (
        <div
          style={{
            minHeight: "308px",
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
            breakpoints={breakpoints}
            keyboard={{ enabled: true }}
            rewind={true}
            modules={[FreeMode, Keyboard, Navigation, Autoplay]}
            navigation={windowSize[0] < 768 ? false : true}
            freeMode={windowSize[0] < 768 ? true : false}
            slidesPerView={windowSize[0] < 768 ? "auto" : 7}
            className="mySwiper"
          >
            {props.type === "cast" &&
              filteredCast.map((cast, index) => {
                return (
                  <SwiperSlide key={cast.id}>
                    <CastCard cast={cast} />
                  </SwiperSlide>
                );
              })}

            {props.type === "images" &&
              data.backdrops.map((image, index) => {
                return (
                  <SwiperSlide key={image.file_path} >
                    <img
                      src={`https://image.tmdb.org/t/p/w342${image.file_path}`}
                      alt="movie"
                      id={image.file_path}
                      loading="lazy"
                      style={{
                        maxWidth: "250px",
                        minHeight: "145px",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        cursor: "pointer"
                      }}
                      onClick={handleModalOpen}
                    />
                  </SwiperSlide>
                );
              })}

            {!props.type &&
              data.map((movie, index) => {
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
