import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Etebase from 'etebase';
import { Footer } from '.';
import cryptico from 'cryptico';
import { UserContext, UserSessionContext } from '../context';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

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
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [showProgress, setShowProgress] = useState(false);
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
      if (formData.confirmPassword !== formData.password) {
        alert('Your passwords do not match');
      }
      // Creates the account
      const eteBaseUser = await Etebase.Account.signup(
        {
          username: formData.username,
          email: formData.email,
        },
        formData.password,
        serverUrl
      );

      // Logs in the user
      const etebase = await Etebase.Account.login(
        formData.username,
        formData.password,
        serverUrl
      );

      // Create encryption key to encrypt the session
      const RSAkey = cryptico.generateRSAKey(formData.password, 186);
      const encryptionKey = cryptico.publicKeyString(RSAkey);

      // Save the session and assign it and the user to the respective state
      // values
      savedSession = await etebase.save(encryptionKey);
      setUser(etebase);
      setUserSession(savedSession);
    } catch (err) {
      console.log(err);
    } finally {
      // Clear the inputs after the button is pressed
      // Hide the progress dialog
      setShowProgress(false);
      // Clear the form and go back to the login page
      setData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      history.push('/albums');
    }
  }

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

  const handleChange = (evt) => {
    evt.persist();
    setData({ ...data, [evt.target.name]: evt.target.value });
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
      </Container>
      <Footer />
    </Box>
  );
}
