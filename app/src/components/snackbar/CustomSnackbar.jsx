import React , { useContext } from "react";
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import snackbarContext from "../../contexts/Snackbar/snackbarContext";
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomSnackbar = () => {

  const { open , setOpen , message , status} = useContext(snackbarContext);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    // <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        key={message}
        autoHideDuration={2000}
        sx={{ minWidth: '350px' }}
        >
        <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
          {message}
        </Alert>
        </Snackbar>
    // </Box>
  );
};

export default CustomSnackbar;
