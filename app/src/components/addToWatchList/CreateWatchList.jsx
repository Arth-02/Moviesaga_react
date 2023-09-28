import React , {useEffect, useState , useContext} from 'react'
import AuthContext from "../../contexts/Auth/AuthContext";
import './createwatchlist.css'
import snackbarContext from '../../contexts/Snackbar/snackbarContext';

const CreateWatchList = ({handleClose , getWatchList}) => {

    const {isAuthenticated , tokens} = useContext(AuthContext);
    const {setOpen , setMessage , setStatus} = useContext(snackbarContext);

    const [watchListName , setWatchListName] = useState("")

    // Create a Watchlist
    const createWatchList = async (e) => {
        e.preventDefault();

        let data = {
            name: watchListName
        }

        const response = await fetch("http://127.0.0.1:8000/movieapp/watchlist/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${tokens.access}`,
            },
            body: JSON.stringify(data)
        });
        if (response.status === 201) {
            setOpen(true);
            setMessage("WatchList Created");
            setStatus("success");
            handleClose();
            getWatchList();
        } else {
            setOpen(true);
            setMessage("Error During Creating WatchList");
            setStatus("error");
            console.log("Error");
        }
    };

  return (
    <>
        <form className='create-wl-container' onSubmit={(e) => createWatchList(e)} >
            <div className='create-wl-header'>
                <h2>Create New WatchList</h2>
            </div>
            <div className='create-wl-body'>
                <label htmlFor='watchlist-name'>Enter WatchList Name</label>
                <input type='text' id='watchlist-name' value={watchListName} onChange={(e) => setWatchListName(e.target.value)} />
            </div>
            <div className='create-wl-footer'>
                <button type='submit'>Create</button>
            </div>
        </form>

    </>
  )
}

export default CreateWatchList