import React, { useContext } from 'react';
import * as Etebase from 'etebase';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext, UserSessionContext } from '../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
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
  const [userSession, setUserSession] = useContext(UserSessionContext);
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
    <Grid container direction='column' align='center'>
      <Typography component='h1' variant='h5' className={classes.title}>
        Public Key
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
  );
}
