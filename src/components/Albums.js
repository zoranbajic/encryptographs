import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Etebase from 'etebase';
import CreateAlbumDialog from './CreateAlbumDialog';
import { UserContext, UserSessionContext } from '../store';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.encryptographs.com'>
        Encryptographs
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Albums() {
  const classes = useStyles();
  const history = useHistory();
  let selectedValue = '';
  let album = {
    name: '',
    description: '',
  };
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const collectionManager = user.getCollectionManager();

  if (!userSession) {
    history.push('/login');
  }

  async function CreateAlbum(evt) {
    try {
      evt.preventDefault();
      alert('This button works!');
    } catch (error) {}
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  // This takes in either "Cancel" or "Create" as a value and the boolean
  // values of the checkboxes in the Checkboxes component which are contained
  // in an object
  const handleClose = (value, album) => {
    // This closes the dialog window
    setOpen(false);
    console.log('Albums - Your value is:', value);
    console.log('Albums - Your album info is:', album);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PhotoAlbumOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          My Albums
        </Typography>
        {/* <form className={classes.form} onSubmit={CreateAlbum}> */}
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={handleClickOpen}
        >
          Create Album
        </Button>
        <CreateAlbumDialog
          open={open}
          onClose={handleClose}
          selectedValue={selectedValue}
          album={album}
        />
        {/* </form> */}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {/* <Backdrop className={classes.backdrop} open={showProgress}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          Your username or password is incorrect.
        </Alert>
      </Snackbar> */}
    </Container>
  );
}
