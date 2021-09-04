import React, { useState, useContext } from 'react';
import * as Etebase from 'etebase';
import { Footer } from '.';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
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

export default function ChangePassword() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [showProgress, setShowProgress] = useState(false);
  const [showCurrentPasswordError, setShowCurrentPasswordError] =
    useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formInfo, setFormInfo] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  async function Submit(evt) {
    try {
      evt.preventDefault();
      setShowProgress(true);

      if (formInfo.newPassword === formInfo.confirmNewPassword) {
        const etebase = await Etebase.Account.login(
          user.user.username,
          formInfo.currentPassword,
          serverUrl
        );
        await etebase.changePassword(formInfo.confirmNewPassword);
        setShowProgress(false);
        setShowSuccess(true);
        setFormInfo({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } else {
        setShowProgress(false);
        setShowNewPasswordError(true);
      }
    } catch (err) {
      console.log(err);
      // Show error message if current password provided is not correct
      setShowProgress(false);
      setShowCurrentPasswordError(true);
    }
  }

  const handleChange = (evt) => {
    setFormInfo({ ...formInfo, [evt.target.name]: evt.target.value });
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
  };

  const handleCurrentPasswordErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowCurrentPasswordError(false);
  };

  const handleNewPasswordErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowNewPasswordError(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Change Password
          </Typography>
          {/* We need to add the onSubmit event listener here */}
          <form className={classes.form} noValidate onSubmit={Submit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='currentPassword'
              label='Current Password'
              type='password'
              name='currentPassword'
              onChange={handleChange}
              value={formInfo.currentPassword}
              autoComplete='currentPassword'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='newPassword'
              onChange={handleChange}
              label='New Password'
              type='password'
              value={formInfo.newPassword}
              id='newPassword'
              autoComplete='newPassword'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='confirmNewPassword'
              onChange={handleChange}
              label='Confirm Password'
              type='password'
              value={formInfo.confirmNewPassword}
              id='confirmNewPassword'
              autoComplete='confirmNewPassword'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Change Password
            </Button>
          </form>
        </div>
        <Backdrop className={classes.backdrop} open={showProgress}>
          <CircularProgress color='primary' />
        </Backdrop>
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity='success'>
            Your password has been successfully updated!
          </Alert>
        </Snackbar>{' '}
        <Snackbar
          open={showNewPasswordError}
          autoHideDuration={6000}
          onClose={handleNewPasswordErrorClose}
        >
          <Alert onClose={handleNewPasswordErrorClose} severity='error'>
            Your new passwords do not match.
          </Alert>
        </Snackbar>
        <Snackbar
          open={showCurrentPasswordError}
          autoHideDuration={6000}
          onClose={handleCurrentPasswordErrorClose}
        >
          <Alert onClose={handleCurrentPasswordErrorClose} severity='error'>
            The provided current password is not correct. Please try again.
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Box>
  );
}
