import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
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

export default function Signup() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const classes = useStyles();
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showProgress, setShowProgress] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showUserError, setShowUserError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const history = useHistory();

  async function Submit(evt) {
    let savedSession;
    // Prevent the default action of refreshing the page
    try {
      evt.preventDefault();
      // Show the loading dialog
      setShowProgress(true);
      const formData = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };
      if (formData.confirmPassword === formData.password) {
        // Creates the account
        const eteBaseUser = await Etebase.Account.signup(
          {
            username: formData.username,
            email: formData.email,
          },
          formData.password,
          serverUrl
        );

        // Clear the form and go back to the login page
        setData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        history.push('/login');
      } else {
        setShowProgress(false);
        setShowPasswordError(true);
      }
    } catch (err) {
      err.message === 'User already exists'
        ? setShowUserError(true)
        : setShowEmailError(true);
      setShowProgress(false);
    }
  }

  const handleChange = (evt) => {
    evt.persist();
    setData({ ...data, [evt.target.name]: evt.target.value });
  };

  const handlePasswordErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowPasswordError(false);
    setShowUserError(false);
    setShowEmailError(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          {/* We need to add the onSubmit event listener here */}
          <form className={classes.form} noValidate onSubmit={Submit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='email'
              onChange={handleChange}
              label='Email'
              type='email'
              value={data.email}
              id='email'
              autoFocus
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              onChange={handleChange}
              value={data.username}
              autoComplete='username'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              onChange={handleChange}
              label='Password'
              type='password'
              value={data.password}
              id='password'
              autoComplete='current-password'
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='confirmPassword'
              onChange={handleChange}
              label='Confirm Password'
              type='password'
              value={data.confirmPassword}
              id='confirmPassword'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <Backdrop className={classes.backdrop} open={showProgress}>
          <CircularProgress color='primary' />
        </Backdrop>
        <Snackbar
          open={showPasswordError}
          autoHideDuration={6000}
          onClose={handlePasswordErrorClose}
        >
          <Alert onClose={handlePasswordErrorClose} severity='error'>
            Your passwords do not match.
          </Alert>
        </Snackbar>
        <Snackbar
          open={showEmailError}
          autoHideDuration={6000}
          onClose={handlePasswordErrorClose}
        >
          <Alert onClose={handlePasswordErrorClose} severity='error'>
            That email address is already in use.
          </Alert>
        </Snackbar>
        <Snackbar
          open={showUserError}
          autoHideDuration={6000}
          onClose={handlePasswordErrorClose}
        >
          <Alert onClose={handlePasswordErrorClose} severity='error'>
            That username is not available.
          </Alert>
        </Snackbar>
      </Container>
      <Footer />
    </Box>
  );
}
