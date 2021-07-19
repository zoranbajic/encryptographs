import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/';

export default function DeleteDialog(props) {
  // const [open, setOpen] = useState(false);
  const { open, onClose, selectedValue, album } = props;

  const handleButtonClick = (value) => {
    onClose(value, album);
  };

  // This handles the case of the dialog window being closed without a button
  // being pressed
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Delete this album?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please confirm that you wish to delete this album.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleButtonClick('Disagree')} color='primary'>
            Disagree
          </Button>
          <Button
            onClick={() => handleButtonClick('Agree')}
            color='primary'
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
