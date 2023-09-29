import React from "react";
import { useLocation } from "react-router-dom";
import "./footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/trending/all" || location.pathname === "/popular/tv" || location.pathname === "/popular/movie")
    return null;

  return (
    <>
      <div className="footer_class">
        <footer>
          <div className="footer-content">
            <h3>Movie Saga</h3>
            <ul className="socials">
              <li>
                <a href="https://www.facebook.com/"><FacebookIcon /></a>
              </li>
              <li>
              <a href="https://www.twitter.com/"><TwitterIcon /></a>
              </li>
              <li>
              <a href="https://www.google.com/"><GoogleIcon /></a>
              </li>
              <li>
              <a href="https://www.youtube.com/"><YouTubeIcon /></a>
              </li>
              <li>
              <a href="https://www.linkedin.com/"><LinkedInIcon/></a>
              </li>
            </ul>
          </div>
          <div className="footer-bottom">
            <p>
              copyright &copy; <a href="/">Movie Saga</a>
            </p>
            <div className="footer-menu">
              <ul className="f-menu">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/">Contact</a>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
