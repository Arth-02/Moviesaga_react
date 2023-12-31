import React, { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import snackbarContext from "../Snackbar/snackbarContext";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const {setOpen , setMessage , setStatus} = useContext(snackbarContext);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("tokens") ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem("tokens")
      ? jwtDecode(JSON.parse(localStorage.getItem("tokens")).access)
      : null
  );
  const [tokens, setTokens] = useState(
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );
  const [loading , setLoading] = useState(false);

  const register = async (username, email, password) => {
    // event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/movieapp/api/users/register/",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
          headers: { "Content-type": "application/json" },
        }
      );

      if (response.ok) {
        const user = await response.json();
        navigate('/')
        login(username , password , "Sign Up Successfully");

      } else {
        setOpen(true);
        setMessage("Something went wrong");
        setStatus("error");

      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    // setLoading(false);
  };


  const login = async (username, password , message) => {
    // event.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/movieapp/api/users/token/",
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: { "Content-type": "application/json" },
        }
      );

      if (response.status === 401) {
        alert("Invalid Credentials");
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        setIsAuthenticated(true);
        setUser(jwtDecode(responseData.access));
        console.log(responseData);
        setTokens(responseData);
        localStorage.setItem("tokens", JSON.stringify(responseData));
        setOpen(true);
        if(message){
          setMessage(message)
        }
        else{
          setMessage("Login Successful");
        }
        setStatus("success");
        setLoading(false);

        navigate("/");
      } else {
        setOpen(true);
        setMessage("Something went wrong while login");
        setStatus("error");
        alert("Something went wrong while login");
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logout = () => {
    console.log("Logging out");
    localStorage.removeItem("tokens");
    setIsAuthenticated(false);
    setOpen(true);
    setMessage("Logout Successful");
    setStatus("success");
    setUser(null);
    setTokens(null);
    navigate("/");
  };

  const refreshToken = async () => {
    console.log("Refreshing Token");

    const response = await fetch(
      "http://127.0.0.1:8000/movieapp/api/users/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: tokens?.refresh,
        }),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      console.log("New : ", data);
      setTokens({
        ...tokens,
        access: data.access,
      });
      setIsAuthenticated(true);
      setUser(jwtDecode(data.access));
      localStorage.setItem(
        "tokens",
        JSON.stringify({ ...tokens, access: data.access })
      );
    } else {
      logout();
    }
  };

  useEffect(() => {
    const refreshTime = 24 * 60 * 1000;
    const refreshInterval = setInterval(() => {
      if (localStorage.getItem("tokens")) {
        refreshToken();
      }
    }, refreshTime);
    return () => clearInterval(refreshInterval);
  }, []);


  const contextData = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    register,
    login,
    logout,
    tokens,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
