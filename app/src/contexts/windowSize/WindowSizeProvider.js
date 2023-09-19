import React, {useEffect, useState} from 'react'
import WindowSizeContext from './WindowSize.js'

const WindowSizeProvider = (props) => {

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);

    const handleWindowResize = () => {
        console.log('resize')
        setWindowSize([window.innerWidth, window.innerHeight]);
    }

      useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        }
      } , [])

  return (
    <WindowSizeContext.Provider value={{windowSize , setWindowSize}}>
        {props.children}
    </WindowSizeContext.Provider>
  )
}

export default WindowSizeProvider