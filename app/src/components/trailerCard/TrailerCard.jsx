import React, { useEffect, useState , useContext } from "react";
import useFetchData from "../../hooks/useFetchData";
//Contexts
import WindowSizeContext from "../../contexts/windowSize/WindowSize";

import './trailercard.css'

const TrailerCard = (props) => {

    const { windowSize } = useContext(WindowSizeContext);

    const url = `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=ace3eeed99f6d9d19e61456a520cda0b`;
  
    const { data } = useFetchData(url);
  
    const [trailer, setTrailer] = useState([]);
    const [play, setPlay] = useState(false);
  
    useEffect(() => {
      data &&
        setTrailer(
          data.filter(
            (item) =>
              item.type === "Trailer" &&
              item.site === "YouTube" &&
              item.official === true
          )
        );
    }, [data]);
  
    const handlePlay = () => {
      setPlay(1);
    };
  
    const handleStop = () => {
      setPlay(0);
    };
  
    return (
      <>
        {trailer.length > 0 && trailer[0].key && (
          <div
            className="trailer-card"
            onMouseEnter={handlePlay}
            onMouseOut={handleStop}
            style={{
              transition: "all 0.3s ease-in-out",
              position: "relative",
              height: "fit-content",
              width: "fit-content",
            }}
          >
            {console.log(trailer)}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer[0].key}?autoplay=${play}&mute=1&controls=0&showinfo=0&autohide=1&loop=1`}
              width={windowSize[0] < 768 ? '300px' : '350px'}
              height={windowSize[0] < 768 ? '180px' : '200px'}
              title={props.title}
              loading="lazy"
              frameBorder="0"
              allow="accelerometer; autoplay; camera; microphone; geolocation; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <div className="trailer-card-title">
              <h4 className="trailer-title">{props.title}</h4>
              <div className="release-date"></div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default React.memo(TrailerCard);