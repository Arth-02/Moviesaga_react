import React, {useState} from 'react'
import WindowSizeContext from './WindowSize.js'

const WindowSizeProvider = (props) => {

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
      ]);

  return (
    <WindowSizeContext.Provider value={{windowSize , setWindowSize}}>
        {props.children}
    </WindowSizeContext.Provider>
  )
}

export default WindowSizeProvider