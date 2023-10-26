import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../contexts/Auth/AuthContext";
import "./watchlist.css";
import Loading from "../../components/loader/Loading";
import WatchListCard from "../../components/watchlistCard/watchListCard";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GeneralModal from "../../components/generalModal/GeneralModal";
import CreateWatchList from "../../components/addToWatchList/CreateWatchList";
import SnackbarContext from "../../contexts/Snackbar/snackbarContext";

const Watchlist = () => {
  const { isAuthenticated, tokens } = useContext(AuthContext);
  const { setOpen, setMessage, setStatus } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(false);
  const [watchList, setWatchList] = useState([]);

  //   Delete WatchList
  const deleteWatchList = async (id) => {
    // setLoading(true);
    const response = await fetch(
      `http://127.0.0.1:8000/movieapp/watchlist/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
      }
    );
    if (response.status === 204) {
      setOpen(true);
      setMessage("WatchList Deleted");
      setStatus("success");
      getWatchList();
    } else {
      setOpen(true);
      setMessage("Error During Deleting WatchList");
      setStatus("error");
      console.log("Error");
    }
    // setLoading(false);
  };

  // Get All the Watchlist of User
  const getWatchList = async () => {
    setLoading(true);
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
    setLoading(false);
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
      !loading && getWatchList();
    }
  }, []);

  return (
    <>
      <div className="watchlist-page">
        <div className="watchlist-header" id="back-to-top-anchor">
          <h2>Your WatchLists</h2>
          <IconButton
            aria-labelledby="add-wl"
            onClick={handleOpenCreateWLModal}
            sx={{
              color: "white",
              backgroundColor: "rgba(0,0,0,0.05)",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
        <div className="watchlist-body">
          {watchList.length > 0 && !loading ? (
            watchList.map((watchlist, index) => (
              <div className="watchlist-container" key={index}>
                <div className="watchlist-name">
                  <h2 className="heading wl-title">{watchlist.name}</h2>
                  <IconButton
                    aria-labelledby="remove-wl"
                    size="small"
                    onClick={() => deleteWatchList(watchlist.id)}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(0,0,0,0.05)",
                      borderRadius: "5px",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: "18px" }} />
                  </IconButton>
                </div>
                <div className="watchlist-movies">
                  {watchlist.movies.length > 0 ? (
                    watchlist.movies.map((movie, index) => {
                      return <WatchListCard getWatchList={getWatchList} movie={movie} key={index} />;
                    })
                  ) : (
                    <div className="no-movies">
                      <h3>No Movies Found</h3>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : !loading ? (
            <h3>No WatchList Found</h3>
          ) : (
            <Loading />
          )}
        </div>
      </div>
      <GeneralModal
        open={showCreateWLModal}
        handleClose={handleCloseCreateWLModal}
      >
        <CreateWatchList handleClose={handleCloseCreateWLModal} getWatchList={getWatchList} />
      </GeneralModal>
    </>
  );
};

export default Watchlist;
