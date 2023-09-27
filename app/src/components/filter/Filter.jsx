import React , {useEffect, useState} from "react";
import "./filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { movie_genres } from "../../constants/genres";

const Filter = ({setFilters , filters}) => {

  const [expanded, setExpanded] = React.useState(false);
  const [selectedLanguage , setSelectedLanguage] = useState(filters.with_original_language);
  const [selectedGenres , setSelectedGenres] = useState(filters.with_genres);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [sort, setSort] = useState("popularity.desc");
  const [releaseDateLT, setReleaseDateLT] = useState(filters);
  const [releaseDateGT, setReleaseDateGT] = useState([]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setFilters(prev => ({...prev, sort_by: event.target.value}))
  };

  const handleGenreChange = (event) => {
    let genre_id = event.target.id;
    let genre_index = selectedGenres?.indexOf(genre_id);
    if(genre_index === -1){
        setSelectedGenres(prev => [...prev, genre_id]);
    }else{
        let newGenres = selectedGenres?.filter((genre, index) => index !== genre_index);
        setSelectedGenres(newGenres);
    }
  };

  useEffect(() => {
    let ele = document.getElementsByClassName("genre-item");
    for(let i = 0 ; i < ele.length ; i++){
      ele[i].classList.remove("selected");
    }
    console.log("selected : " , selectedGenres)
    selectedGenres && selectedGenres?.map((genre, index) => {
      let ele = document.getElementById(genre);
      ele.classList.add("selected");
    })

    selectedGenres && setFilters(prev => ({...prev, with_genres: selectedGenres?.join(",")}))
  } , [selectedGenres])

    const handleLanguageChange = (event) => {
      if(selectedLanguage === event.target.id){
        setSelectedLanguage("");
        return;
      }
      setSelectedLanguage(event.target.id);
    };

    useEffect(() => {
      let ele = document.getElementsByClassName("language-item");
      for(let i = 0 ; i < ele.length ; i++){
        ele[i].classList.remove("selected");
      }
      let ele2 = document.getElementById(selectedLanguage);
      ele2?.classList.add("selected");
      setFilters(prev => ({...prev, with_original_language: selectedLanguage}))
    } , [selectedLanguage])



  const handleReleaseDateLTChange = (event) => {
    setReleaseDateLT(event.target.value);
    setFilters(prev => ({...prev, "release_date.lte": event.target.value}))
  };

  const handleReleaseDateGTChange = (event) => {
    setReleaseDateGT(event.target.value);
    setFilters(prev => ({...prev, "release_date.gte": event.target.value}))
  };

  return (
    <div className="filter-container">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{
            backgroundColor: "rgb(37,37,37)",
            color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          color="inherit"
        >
          <span className="filter-title">Sort</span>
        </AccordionSummary>
        <AccordionDetails color="inherit">
          <Select value={sort} onChange={handleSortChange} displayEmpty sx={{
            backgroundColor: "rgb(25,25,25)",
            color: "white",
            "&MuiSvgIcon-root": {
              color: "white"
            }
          }}>
            <MenuItem value={"popularity.desc"}>Popularity Descending</MenuItem>
            <MenuItem value={"popularity.asc"}>Popularity Ascending</MenuItem>
            <MenuItem value={"vote_average.desc"}>Rating Descending</MenuItem>
            <MenuItem value={"vote_average.asc"}>Rating Ascending</MenuItem>
            <MenuItem value={"revenue.desc"}>Revenue Descending</MenuItem>
            <MenuItem value={"revenue.asc"}>Revenue Ascending</MenuItem>
          </Select>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{
            backgroundColor: "rgb(37,37,37)",
            color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <span className="filter-title">Genres</span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="filter-item genres">
            {movie_genres?.map((genre, index) => {
              return (
                <div key={index} onClick={handleGenreChange} id={genre.id}  className={`genre-item `}>
                  {genre.name}
                </div>
              );
            })}
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{
            backgroundColor: "rgb(37,37,37)",
            color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <div className="filter-title">Languages</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="filter-item languages">
            <div className="language-item" id="en" onClick={handleLanguageChange}>English</div>
            <div className="language-item" id="hi" onClick={handleLanguageChange}>Hindi</div>
            <div className="language-item" id="fr" onClick={handleLanguageChange}>French</div>
            <div className="language-item" id="es" onClick={handleLanguageChange}>Spanish</div>
            <div className="language-item" id="it" onClick={handleLanguageChange}>Italian</div>
            <div className="language-item" id="gu" onClick={handleLanguageChange}>Gujarati</div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{
            backgroundColor: "rgb(37,37,37)",
            color: "white",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <div className="filter-title">Release Date</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="filter-item release-date">
            <div className="filter-item-from">
                From
                <input type="date"  />    
            </div>
            <div className="filter-item-to">
                To
                <input type="date" />    
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default React.memo(Filter);
