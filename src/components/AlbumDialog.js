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

export default function AlbumDialog(props) {
  const { onClose, selectedValue, open, album, message } = props;
  const [albumInfo, setAlbumInfo] = useState({
    name: album.name || '',
    description: album.description || '',
    uid: album.uid || '',
  });

  const handleChange = (evt) => {
    setAlbumInfo({ ...albumInfo, [evt.target.name]: evt.target.value });
  };

  // This handles the case of the dialog window being closed without a button
  // being pressed
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleButtonClick = (value) => {
    // We use the onClose function we got from the parent component through
    // props and pass the button pressed
    // This results in the value being passed back to the parent
    // component where we set selectedValue to that value
    // If this dialog is used to create an album, we need to clear the below
    // fields otherwise they will remain populated
    if (value === 'Create') {
      setAlbumInfo({
        name: '',
        description: '',
        uid: '',
      });
    }
    onClose(value, albumInfo);
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
        {message === 'Create' ? (
          <DialogTitle id='form-dialog-title'>Create Album</DialogTitle>
        ) : (
          <DialogTitle id='form-dialog-title'>Edit Album</DialogTitle>
        )}

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
          <Button onClick={() => handleButtonClick('Cancel')} color='primary'>
            Cancel
          </Button>
          {/* This is a conditional to change the button name depending on
              what the parent component is */}
          {message === 'Create' ? (
            <Button onClick={() => handleButtonClick('Create')} color='primary'>
              Create
            </Button>
          ) : (
            <Button onClick={() => handleButtonClick('Save')} color='primary'>
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
