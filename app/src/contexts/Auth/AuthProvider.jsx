import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

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

  const register = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/movieapp/api/users/register/",
        {
          method: "POST",
          body: JSON.stringify({
            username: data.get("username"),
            password: data.get("password"),
            email: data.get("email"),
          }),
          headers: { "Content-type": "application/json" },
        }
      );

      if (response.ok) {
        const user = await response.json();

        setLoading(false);
        navigate("/login");

      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    setLoading(false);
  };

  const login = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const response = await fetch(
        "http://127.0.0.1:8000/movieapp/api/users/token/",
        {
          method: "POST",
          body: JSON.stringify({
            username: data.get("username"),
            password: data.get("password"),
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

        setLoading(false);

        navigate("/");
      } else {
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
    const refreshTime = 1 * 30 * 1000;
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
