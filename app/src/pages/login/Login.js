import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import "./login.css";

// import { MyContext } from '../../MyContext';
import { useContext } from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/loader/Loading";

import AuthContext from "../../contexts/Auth/AuthContext";

// import Cookies from 'js-cookie';

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const Login = () => {
  const navigate = useNavigate();

  // const { setIsAuthenticated , setUserInfo} = useContext(MyContext);

  let { login, loading } = useContext(AuthContext);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login");
    login(name, password);
  };

  // loading = true

  return (
    <>
      {loading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
        ) : (
          <div className="whole_login_style">
            <form onSubmit={handleSubmit} className="form_login" action="/">
              <p className="form_title">Log in</p>
              <div className="usernamebox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                </svg>
                <input
                  type="text"
                  className="username"
                  placeholder="Username"
                  autoComplete="uname"
                  label="Username"
                  name="username"
                  maxLength="40"
                  id="username"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="passwordbox">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"></path>
                </svg>

                <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  required
                  name="password"
                  id="pass"
                  label="Password"
                  autoComplete="current-password"
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <svg
                  style={{ cursor: "pointer" }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                >
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                </svg>
              </div>

              <div className="rememberme">
                <div className="rememberMe_box">
                  <p className="remember_me">Remember me</p>

                  <label className="container">
                    <input type="checkbox" className="checkbox" />
                    <svg
                      viewBox="0 0 64 64"
                      height="20px"
                      width="20px"
                      className="svg_checkbox"
                    >
                      <path
                        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                        pathLength="575.0541381835938"
                        className="path"
                      ></path>
                    </svg>
                  </label>
                </div>
                <Link to="/signup">
                  <p style={{color:"black"}}>Don't have an account? Sign Up</p>
                </Link>
              </div>
              <input type="submit" className="btn" value="Login"/>
            </form>
          </div>
        )}
    </>
  );
};

export default Login;
