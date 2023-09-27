import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./addtowatchlist.css";
import AuthContext from "../../contexts/Auth/AuthContext";
import GeneralModal from "../generalModal/GeneralModal";
import CreateWatchList from "./CreateWatchList";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../loader/Loading";

const AddToWatchList = ({ movie, handleClose }) => {
  const { isAuthenticated, tokens } = useContext(AuthContext);
  const navigate = useNavigate();

  const [watchList, setWatchList] = useState([]);
  const [loading , setLoading] = useState(false);

  // Add Movie To WatchList
  const addMovieToWatchList = async (watchListId) => {
    let data = {
      movie_id: movie.id,
      watchlistid: watchListId,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      release_date: movie.release_date || movie.first_air_date,
      rating: parseFloat(movie.vote_average).toFixed(1),
    };

    const response = await fetch("http://127.0.0.1:8000/movieapp/add-movie/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      handleClose();
    }
    else{
      console.log("Error");
    }
  }

  // Get All the Watchlist of User
  const getWatchList = async () => {
    setLoading(true)
    const response = await fetch("http://127.0.0.1:8000/movieapp/watchlist/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.access}`,
      },
    });
    if (response.status === 200) {
      const data = await response.json();
      setWatchList(data);
    } else {
      console.log("Error");
    }
    setLoading(false)
  };

  // Modal Functions
  const [showCreateWLModal, setShowCreateWlModal] = useState(false);
  const handleOpenCreateWLModal = () => {
    setShowCreateWlModal(true);
  };
  const handleCloseCreateWLModal = () => {
    setShowCreateWlModal(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getWatchList();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="addtowatchlist">
        <div className="addto-wl-header">
          <h2>Your WatchLists</h2>
          <button className="create-wl-btn" onClick={handleOpenCreateWLModal}>Create New</button>
        </div>
        <div className="addto-wl-body">
          {watchList.length > 0 && !loading ? (
            watchList?.map((wl) => (
              <div className="addto-wl-item" key={wl.id}>
                <div className="addto-wl-item-name">
                  <h3>{wl.name}</h3>
                  <span className="wl-movies-count">({wl.movies.length} movies)</span>
                </div>
                <IconButton
                  aria-labelledby="add-to-watchlist"
                  onClick={() => addMovieToWatchList(wl.id)}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.05)",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </div>
            ))
          ) : (
            !loading ? (
              <div className="no-wl-found">
              <h3>No WatchList Found</h3>
            </div>
            ) : (
              <div className="addto-wl-loading">
                <Loading />
              </div>
            ) 
          )}
        </div>
      </div>
      <GeneralModal
        open={showCreateWLModal}
        handleClose={handleCloseCreateWLModal}
      >
        <CreateWatchList handleClose={handleCloseCreateWLModal} />
      </GeneralModal>
    </>
  );
};

export default AddToWatchList;
