import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, ListItemIcon, Menu, MenuItem } from "@mui/material";

// import { MyContext } from '../../MyContext';

import AuthContext from "../../contexts/Auth/AuthContext";

const Account = () => {
  // const { setIsAuthenticated } = useContext(MyContext);

  const { logout, user } = useContext(AuthContext);

  const [menu, setMenu] = useState(false);

  const handleClick = (event) => {
    setMenu(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(false);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
        aria-controls={menu ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={menu ? "true" : undefined}
        sx={{ padding: 0 , marginLeft: '12px' }}
      >
        <AccountCircleIcon />
      </IconButton>

      <Menu
        anchorEl={menu}
        id="account-menu"
        open={Boolean(menu)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon>
            <Avatar> {user?.username[0].toUpperCase()} </Avatar>
          </ListItemIcon>
          <span>Profile</span>
        </MenuItem>
          <Link to={"/watchlist"}>
        <MenuItem>
            <ListItemIcon>
              <PlaylistPlayOutlinedIcon />
            </ListItemIcon>
            <span className="link">Your Watchlist</span>
        </MenuItem>
          </Link>
        <MenuItem>
          <ListItemIcon>
            <FavoriteBorderOutlinedIcon />
          </ListItemIcon>
          <span>Your Favourites</span>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <span>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Account;
