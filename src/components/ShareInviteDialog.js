import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  useMediaQuery,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

// Styling for the send button
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ShareInviteDialog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { onClose, selectedValue, open } = props;
  const [inviteeSelections, setInviteeSelections] = useState({
    user: '',
    userAccess: 'read',
  });

  const handleTextChange = (evt) => {
    setInviteeSelections({
      ...inviteeSelections,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleRadioChange = (evt) => {
    setInviteeSelections({
      ...inviteeSelections,
      userAccess: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setInviteeSelections({
      user: '',
      userAccess: 'read',
    });
    onClose('Send', inviteeSelections);
  };

  const handleCancel = (evt) => {
    setInviteeSelections({
      user: '',
      userAccess: 'read',
    });
    onClose('Cancel', inviteeSelections);
  };

  return (
    <Dialog
      open={open}
      // When you click away from the dialog this fires. If this was not here
      // you would need to select an option to close the window
      onClose={handleCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullScreen={fullScreen}
    >
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please enter the name of the user you would like to share this album
            with and select the level of access you would like them to have.
          </DialogContentText>
          {/* We send the getShareInputContents function as a prop */}
          <TextField
            autoFocus
            id='user'
            label='User'
            name='user'
            required
            variant='outlined'
            value={inviteeSelections.user}
            onChange={handleTextChange}
            fullWidth
          />

          <FormControl component='fieldset'>
            <RadioGroup
              row
              aria-label='position'
              name='position'
              onChange={handleRadioChange}
              value={inviteeSelections.userAccess}
            >
              <FormControlLabel
                control={<Radio color='primary' />}
                label='Admin'
                labelPlacement='bottom'
                name='admin'
                value='admin'
              />
              <FormControlLabel
                value='readWrite'
                control={<Radio color='primary' />}
                label='View and Add/Delete'
                labelPlacement='bottom'
                name='readWrite'
                value='readWrite'
              />
              <FormControlLabel
                value='read'
                control={<Radio color='primary' />}
                label='View Only'
                labelPlacement='bottom'
                name='read'
                value='read'
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color='primary' value='Cancel'>
            Cancel
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
            value='Send'
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
