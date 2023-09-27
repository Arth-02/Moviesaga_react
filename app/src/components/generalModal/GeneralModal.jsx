import React from "react";
import { Fade, Modal , Backdrop } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // minWidth: 400,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    backgroundColor: "rgb(26,26,26)",
    '@media (maxWidth: 600px)': {
      width: '100%',
      minWidth: '100%',
      margin: 0,
      borderRadius: 0,
    },
  };


const GeneralModal = ({open , handleClose , children}) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    //   sx={{ '& *': { outline: 'none' } }}
    disableAutoFocus
    >
      <Fade in={open}>
        <div className="modal-container" style={style} >
            {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default GeneralModal;
