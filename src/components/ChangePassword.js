import React, { useState, useContext } from 'react';
import * as Etebase from 'etebase';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
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
  const [showError, setShowError] = useState(false);
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
      }
    } catch (err) {
      console.log(err);
      // Show error message if passwords do not match
      setShowError(true);
    } finally {
      alert('Password Changed!');
      setShowProgress(false);
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
