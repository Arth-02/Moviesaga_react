import React , { createContext , useState } from 'react'

const snackbarContext = createContext()

export default snackbarContext

export const SnackbarContextProvider = ({ children }) => {
    const [open , setOpen] = useState(false);
    const [message , setMessage] = useState('');
    const [status , setStatus] = useState('');

    const contextData = {
        open,
        setOpen,
        message,
        setMessage,
        status,
        setStatus
    }

    return (
        <snackbarContext.Provider value={contextData}>
            {children}
        </snackbarContext.Provider>
    )
}

