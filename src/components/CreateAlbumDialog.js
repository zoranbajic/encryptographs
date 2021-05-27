import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core/';

// This is required for the styling of the button
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function CreateAlbumDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, album } = props;
  const [albumInfo, setAlbumInfo] = useState({
    name: '',
    description: '',
  });

  const handleChange = (evt) => {
    setAlbumInfo({ ...albumInfo, [evt.target.name]: evt.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // This handles the case of the dialog window being closed without a button
  // being pressed
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleButtonClick = (value) => {
    // We use the onClose function we got from the Albums component through
    // props and pass the button pressed
    // This results in the value being passed back to the Albums
    // component where we set selectedValue to that value
    album.name = albumInfo.name;
    album.description = albumInfo.description;
    setAlbumInfo({
      name: '',
      description: '',
    });
    onClose(value, album);
  };

  return (
    <div>
      <Dialog
        open={open}
        // When you click away from the dialog this fires. If this was not here
        // you would need to select an option to close the window
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Create Album</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name and description (optional) for your album.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            label='Name'
            name='name'
            value={albumInfo.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin='dense'
            id='description'
            label='Description (Optional)'
            name='description'
            onChange={handleChange}
            value={albumInfo.description}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleButtonClick()} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleButtonClick('Create')} color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
