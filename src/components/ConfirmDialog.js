import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core/';

export default function ConfirmDialog(props) {
  const { title, children, open, setOpen, onOk } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='confirm-dialog'
    >
      <DialogTitle id='confirm-dialog'>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          onClick={() => {
            setOpen(false);
            onOk('Send');
          }}
          color='secondary'
        >
          Ok
        </Button>
        {/* <Button
          variant='contained'
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
          color='default'
        >
          Ok
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}
