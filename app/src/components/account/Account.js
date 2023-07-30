import React, { useState , useContext } from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Avatar, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext';

const Account = () => {

    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(MyContext);

    const [menu, setMenu] = useState(false);

    const handleClick = (event) => {
        setMenu(event.currentTarget);
    }

    const handleClose = () => {
        setMenu(false);
    }

    const handleSignOut = async () => {
        await fetch('http:localhost:8000/auth/logout').then((response) => {
            if(response.status === 200){
                setIsAuthenticated(false);
                navigate('/');
            }
            else{
                console.log("Error while logout");
            }
        })
    }

    return (
        <>
            <IconButton
                onClick={handleClick}
                color='inherit'
                aria-controls={menu ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={menu ? 'true' : undefined}
            >
                <AccountCircleIcon />
            </IconButton>

            <Menu anchorEl={menu}
                id='account-menu'
                open={Boolean(menu)}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem >
                    <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PlaylistPlayOutlinedIcon fontSize="small" /> Your Watchlist
                    </ListItemIcon>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <FavoriteBorderOutlinedIcon fontSize="small" /> Your Favorite
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={ handleSignOut }>
                    <ListItemIcon>
                         Sign Out
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Account