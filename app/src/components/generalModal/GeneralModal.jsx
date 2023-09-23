import React from "react";
import { Fade, Modal , Backdrop } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
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
