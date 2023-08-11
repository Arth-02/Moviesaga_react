import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import Movie from './pages/movie/Movie';
import Tv from './pages/tv/Tv';
import SignUp from './pages/signup/SignUp';
import { useState } from 'react';
import { MyContext } from "./MyContext";
import MovieList from './pages/listing/MovieList';
import SearchResult from './pages/search result/SearchResult';

//Contexts
import WindowSizeProvider from './contexts/windowSize/WindowSizeProvider';


function App() {

  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [userInfo , setUserInfo] = useState(null);

  return (
    <div className="App">
       <MyContext.Provider value={{ isAuthenticated , setIsAuthenticated , userInfo , setUserInfo}}>
        <WindowSizeProvider>
        <BrowserRouter>
          <Header/>
            <Routes>
              <Route path='/' element={<Home/>} ></Route>
              <Route path='/search' element={<SearchResult/>} ></Route>
              <Route path='/movie/:id' element={<Movie/>} ></Route>
              <Route path='/tv/:id' element={<Tv/>} ></Route>
              <Route path='/login' element={<Login/>} ></Route>
              <Route path='/signup' element={<SignUp/>} ></Route>
              <Route path='/trending/movie' element={<MovieList type={'movie'} title={'Movies'}/>} ></Route>
              <Route path='/trending/tv' element={<MovieList type={'tv'} title={'Tv Shows'}/>} ></Route>
              <Route path='/trending/all' element={<MovieList type={'all'} title={null}/>} ></Route>
              {/* <Route path='/search' element={<MovieList type={'search'} title={'Search Results for'}/>} ></Route> */}
            </Routes>
          <Footer/>
        </BrowserRouter>
        </WindowSizeProvider>

       </MyContext.Provider>
    </div>
  );
}

export default App;
