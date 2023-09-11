import React , {useState} from "react";
import "./filter.css";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { movie_genres } from "../../constants/genres";

const Filter = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [sort, setSort] = useState("popularity.desc");

  const handleSortChange = (event) => {
    setSort(event.target.value);
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
            {console.log(movie_genres)}
            {movie_genres.map((genre, index) => {
              return (
                <div key={index} className={`genre-item ${(index % 3 === 0) ? "selected" : ""} `}>
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
            <div className="language-item">English</div>
            <div className="language-item">Hindi</div>
            <div className="language-item">French</div>
            <div className="language-item">Spanish</div>
            <div className="language-item">German</div>
            <div className="language-item">Italian</div>
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
                <input type="date" />    
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
