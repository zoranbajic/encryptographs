import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import { ConfirmDialog, ShareDialogInputs } from '.';
import SendIcon from '@material-ui/icons/Send';

// Styling for the send button
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ShareInviteDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  const [sendButtonActivity, setSendButtonActivity] = useState(false);
  const [shareInputContents, setShareInputContents] = useState({});

  // For confirmation dialog
  const [sendOpen, setSendOpen] = useState(false);

  // We use this to obtain the value of the text and radio button selected in
  // the ShareDialogInputs component
  const getShareInputContents = (inviteeSelections) => {
    setShareInputContents(inviteeSelections);
  };

  // This handles the case of the dialog window being closed without a button
  // being pressed
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleSendClick = (value) => {
    setSendOpen(true);
    handleButtonClick(value);
  };

  const handleButtonClick = (value) => {
    // We use the onClose function we got from the AlbumCard component through
    // props and pass the button pressed and the value of the text/radio inputs
    // This results in the value being passed back to the AlbumCard
    // component where we set selectedValue to that value
    onClose(value, shareInputContents);
  };

  return (
    <Dialog
      open={open}
      // When you click away from the dialog this fires. If this was not here
      // you would need to select an option to close the window
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <form noValidate autoComplete='off'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Please enter the name of the user you would like to share this album
            with and select the level of access you would like them to have.
          </DialogContentText>
          {/* We send the getShareInputContents function as a prop */}
          <ShareDialogInputs getShareInputContents={getShareInputContents} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleButtonClick('Cancel')} color='primary'>
            Cancel
          </Button>
          <div style={{ flex: '1 0 0' }} />
          <Button
            // onClick={() => handleButtonClick('Send')}
            onClick={() => handleSendClick('Send')}
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<SendIcon>send</SendIcon>}
            // disabled={sendButtonActivity}
          >
            Send
          </Button>
          <ConfirmDialog
            title='Reminder Sent!'
            open={sendOpen}
            setOpen={setSendOpen}
            onOk={handleButtonClick}
          >
            Your invitation has been sent!
          </ConfirmDialog>
        </DialogActions>
      </form>
    </Dialog>
  );
}
