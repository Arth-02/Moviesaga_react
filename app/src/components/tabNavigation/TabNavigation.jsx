import React, { useState } from "react";
import "./tabnavigation.css";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Slider from "../slider/Slider";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TabNavigation = () => {
  const [value, setValue] = useState(0);

  const provider = [
    {
      name: "Netflix",
      id: 8,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=8&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Amazon Prime",
      id: 119,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=119&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Hotstar",
      id: 122,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=122&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Apple Tv",
      id: 2,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=2&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Google Play",
      id: 3,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=3&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Jio Cinema",
      id: 220,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=220&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Sony Liv",
      id: 237,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=237&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
    {
      name: "Eros Now",
      id: 218,
      url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&watch_region=IN&sort_by=popularity.desc&with_watch_providers=218&api_key=ace3eeed99f6d9d19e61456a520cda0b",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
        <h2 className="provider-heading heading" style={{marginBottom: '20px'}}>
        Explore what's streaming{" "}
        <ArrowForwardIosIcon sx={{ fontSize: "26px" }} className="arrow" />
      </h2>
      <Box sx={{ width: "100%", minHeight: "500px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="provider-navigation-tabs"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#f5c518",
                height: "2px",
                borderRadius: "10px",
              },
              "& .MuiTab-root": {
                minWidth: "100px",
                color: "white",
                fontSize: "0.95rem",
                "&:hover": {
                  color: "#f5c518",
                },
                "&.Mui-selected": {
                  color: "white",
                },
              },
            }}
          >
            {provider.map((item, index) => {
              return (
                <Tab
                  label={item.name}
                  key={index}
                  id={`simple-tab-${index}`}
                  aria-controls={`simple-tabpanel-${index}`}
                />
              );
            })}
          </Tabs>
        </Box>
        {provider.map((item, index) => {
          return (
            value === index && (
              <CustomTabPanel
                value={value}
                url={item.url}
                index={index}
                key={index}
              ></CustomTabPanel>
            )
          );
        })}
      </Box>
    </section>
  );
};

export default TabNavigation;

function CustomTabPanel(props) {
  const { children, value, index, url, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {
        <Box sx={{ p: 3 }}>
          <Slider url={url} />
        </Box>
      }
    </div>
  );
}
