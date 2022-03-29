import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = (props) => {

  const handleClose = () => {
    props.setShowDialog(false);
  };


  return (
    <>
      <Dialog
        open={props.showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Registration Status"}
        </DialogTitle>
        <DialogContent>

            <DialogContentText id="alert-dialog-description">
               Your Credentials does not meet criteria.
            </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertDialog;