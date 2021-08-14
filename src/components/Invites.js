import React, { useContext, useState } from 'react';
import * as Etebase from 'etebase';
import { useHistory, useLocation } from 'react-router';
import { UserContext, UserSessionContext } from '../store';
import { PublicKeyDialog } from '.';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
  button: {
    marginRight: '10px',
    marginTop: '10px',
  },
  listItem: {
    paddingRight: '200px',
  },
}));

export default function InteractiveList() {
  const classes = useStyles();
  const location = useLocation();
  const invites = location.state.invites;
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [openPublicKeyDialog, setOpenPublicKeyDialog] = useState(false);
  const history = useHistory();

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  const handlePublicKeyDialogClickOpen = () => {
    setOpenPublicKeyDialog(true);
  };

  function getPublicKey(invite) {
    const publicKey = invite.fromPubkey;
    const delimiter = ' ';
    const prettyFingerprint = Etebase.getPrettyFingerprint(
      publicKey,
      delimiter
    );

    const lineOne = prettyFingerprint.substr(0, 23);
    const lineTwo = prettyFingerprint.substr(24, 23);
    const lineThree = prettyFingerprint.substr(48);

    return { lineOne, lineTwo, lineThree };
  }

  console.log('Invites: Your state info is', invites);

  return (
    <div className={classes.paper}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {invites.data.map((invite) => (
          <Grid item xs={12} md={12}>
            <div>
              <List>
                <ListItem divider className={classes.listItem} key={invite.uid}>
                  <IconButton onClick={handlePublicKeyDialogClickOpen}>
                    <AccountCircleIcon />
                  </IconButton>
                  <PublicKeyDialog
                    open={openPublicKeyDialog}
                    onClose={setOpenPublicKeyDialog}
                    username={invite.fromUsername}
                    getPublicKey={getPublicKey(invite)}
                  />
                  <ListItemText
                    primary={invite.fromUsername}
                    secondary={`${invite.fromUsername} wants to share an album with you.`}
                  />
                  <ListItemSecondaryAction>
                    <Button
                      className={classes.button}
                      variant='outlined'
                      color='secondary'
                      aria-label='deny'
                      size='small'
                    >
                      Deny
                    </Button>
                    <Button
                      className={classes.button}
                      edge='end'
                      variant='contained'
                      aria-label='accept'
                      color='primary'
                      size='small'
                    >
                      Accept
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
