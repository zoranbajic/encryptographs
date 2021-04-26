import React, { useState } from 'react';
import * as Etebase from 'etebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../store';
import Container from '@material-ui/core/Container';

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
  const [formInfo, setFormInfo] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  async function Submit(evt) {
    try {
      evt.preventDefault();
      setShowProgress(true);

      const etebase = await Etebase.Account.login(
        formInfoToSubmit.username,
        formInfoToSubmit.password,
        serverUrl
      );
    } catch (error) {
      console.log('Your error is', error);
      // Show error message if passwords do not match
      setShowError(true);
    } finally {
      setShowProgress(false);
    }
  }

  return (
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
            id='currentPassword'
            label='Current Password'
            name='currentPassword'
            onChange={handleChange}
            value={data.currentPassword}
            autoComplete='currentPassword'
            autoFocus
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
