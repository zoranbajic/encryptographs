import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent);

export default function PublickKeyDialog(props) {
  const { open, onClose, username, getPublicKey } = props;
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle id='customized-dialog-title' onClose={handleClose}>
        {`${username}'s Public Key`}
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{getPublicKey.lineOne}</Typography>
        <Typography gutterBottom>{getPublicKey.lineTwo}</Typography>
        <Typography gutterBottom>{getPublicKey.lineThree}</Typography>
      </DialogContent>
    </Dialog>
  );
}
