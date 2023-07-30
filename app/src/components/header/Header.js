import React, { useState , useContext } from 'react'
import { Link, useLocation , useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Account from '../account/Account';
import { MyContext } from '../../MyContext';
import './header.css';
import { Button } from '@mui/material';

const Header = () => {
  const { isAuthenticated } = useContext(MyContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(null);

  const handleSearch = () => {
    console.log(searchTerm);
    searchTerm && navigate(`/search?query=${searchTerm}`);
  }

  return (
    <>
      <header className='header'>
        <div className='logo'>
          <h3><Link to={'..'}>MovieSaga</Link></h3>
        </div>
        <div className='navtabs'>
        <span><Link to={'..'} className={location.pathname === '/' ? 'active tabs' : 'tabs'} >Home</Link></span>
          <span><Link to={'/trending/movie'} className={location.pathname === '/trending/movie' ? 'active tabs' : 'tabs'} >Movies</Link></span>
          <span><Link to={'/trending/tv'} className={location.pathname === '/trending/tv' ? 'active tabs' : 'tabs'} >Tv Shows</Link></span>
          <span><Link to={'..'} className={window.pathname === '/categories' ? 'active tabs' : 'tabs'} >Categories</Link></span>
          <span><Link to={'/trending/all'} className={location.pathname === '/trending/all' ? 'active tabs' : 'tabs'} >Trending</Link></span>
        </div>
        <div className='right-navbar'>
          <div className='search-box'>

              <IconButton color='inherit' className='search-icon' label='hidden' onClick={handleSearch} > <SearchIcon /> </IconButton>
              <input type='text' className='search-input' placeholder='Search.... ' name='Search' onChange={(e) => {setSearchTerm(e.target.value)}}/>

          </div>
          <div className='user-panel'>
            <div className='liked-movies'> <IconButton color='inherit'> <FavoriteBorderIcon /> </IconButton> </div>

            {isAuthenticated ? <Account/> : <Button variant="text" color='inherit'> <Link to={'/login'}>Sign In</Link></Button>}

          </div>
        </div>
      </header>
    </>
  )
}

export default Header