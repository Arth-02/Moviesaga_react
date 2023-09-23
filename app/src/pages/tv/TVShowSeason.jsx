import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./tv.css";
import useFetchData from "../../hooks/useFetchData";

const TVShowSeason = () => {
  const params = useParams();

  const [seasonData, setSeasonData] = useState(null);

//   const { data } = useFetchData(
//     `https://api.themoviedb.org/3/tv/${params.id}/season/${params.season_number}?api_key=ace3eeed99f6d9d19e61456a520cda0b`
//   );

//   useEffect(() => {
//     setSeasonData(data);
//   }, [data]);

  return (
    <>
      {seasonData && (
        <section className="tvshow-season-page">
          <div className="tvshow-season-page-header">
            <h1 className="tvshow-season-page-title">
              {seasonData.name ? seasonData.name : "NA"}
            </h1>
          </div>

          <div className="tvshow-season-page-episodes">
            {seasonData.episodes.map((episode) => (
              <TVShowEpisode key={episode.id} episode={episode} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default TVShowSeason;

const TVShowEpisode = ({ episode }) => {
    return (
      <div className="tvshow-episode">
        <div className="tvshow-episode-header">
          <h3 className="tvshow-episode-title">
            {episode.episode_number}. {episode.name}
          </h3>
          <p className="tvshow-episode-airdate">{episode.air_date}</p>
        </div>
        <div className="tvshow-episode-overview">
          <p>{episode.overview}</p>
        </div>
      </div>
    );
  };