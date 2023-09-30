import React from "react";
import { useLocation , Link } from "react-router-dom";
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
            <div className="footer-para">
              <p>
              "Whether you're a cinephile or a TV series fanatic, our website caters to all genres and interests, making it a one-stop destination for entertainment enthusiasts looking to enhance their viewing experiences."
              </p>
            </div>
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
              copyright &copy; <Link to="/">Movie Saga</Link>
            </p>
            <div className="footer-menu">
              <ul className="f-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
                <li>
                  <Link to="/">Blog</Link>
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
