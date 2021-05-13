import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Etebase from 'etebase';
import cryptico from 'cryptico';
import { UserContext } from '../store';
import { UserSessionContext } from '../store';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
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

export default function ConfirmPassword() {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [showProgress, setShowProgress] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formInfo, setFormInfo] = useState({
    username: '',
    password: '',
  });
  const history = useHistory();

  async function Submit(evt) {
    let savedSession;
    try {
      // Prevent the default action of refreshing the page
      evt.preventDefault();
      // Show the loading dialog
      setShowProgress(true);

      const formInfoToSubmit = {
        password: formInfo.password,
      };

      // Decrypt the session and set the User state with it
      const RSAkey = cryptico.generateRSAKey(formInfoToSubmit.password, 4096);
      const encryptionKey = cryptico.publicKeyString(RSAkey);
      console.log('The encryption key is', encryptionKey);
    } catch (error) {
      console.log('Your error is', error);
      setShowError(true);
    } finally {
      // Hide the progress dialog
      setShowProgress(false);
      // If password was not successful, logout the user
    }
  }

  const handleChange = (evt) => {
    setFormInfo({ ...formInfo, [evt.target.name]: evt.target.value });
  };

  const handleClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={Submit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            onChange={handleChange}
            value={formInfo.password}
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Confirm Password
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Backdrop className={classes.backdrop} open={showProgress}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          Your username or password is incorrect.
        </Alert>
      </Snackbar>
    </Container>
  );
}
