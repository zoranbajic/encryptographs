import React, { useContext } from 'react';
import * as Etebase from 'etebase';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../context';
import { Footer } from '.';
import {
  Box,
  CssBaseline,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(8),
  },
  centerColumn: {
    height: 750,
    marginTop: theme.spacing(-30),
  },
}));

export default function PublicKey() {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();

  const invitationManager = user.getInvitationManager();
  const myPublicKey = invitationManager.pubkey;
  const delimiter = ' ';
  const prettyFingerprint = Etebase.getPrettyFingerprint(
    myPublicKey,
    delimiter
  );

  const lineOne = prettyFingerprint.substr(0, 23);
  const lineTwo = prettyFingerprint.substr(24, 23);
  const lineThree = prettyFingerprint.substr(48);

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
          <Grid container direction='column' align='center'>
            <Typography component='h1' variant='h4' className={classes.title}>
              Your Public Key
            </Typography>
            <Grid
              container
              direction='column'
              justifyContent='center'
              alignItems='center'
              className={classes.centerColumn}
            >
              <Typography variant='h5'>{lineOne}</Typography>
              <Typography variant='h5'>{lineTwo}</Typography>
              <Typography variant='h5'>{lineThree}</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Footer />
    </Box>
  );
}
