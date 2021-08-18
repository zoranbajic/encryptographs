import React, { useContext, useState } from 'react';
import * as Etebase from 'etebase';
import { useHistory, useLocation } from 'react-router';
import { InviteContext, UserContext, UserSessionContext } from '../context';
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
  const [invites, setInvites] = useContext(InviteContext);
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

  async function getInvites() {
    const invitationManager = user.getInvitationManager();
    const invitations = await invitationManager.listIncoming();
    setInvites(invitations);
  }

  async function handleAccept(invite) {
    try {
      const invitationManager = user.getInvitationManager();
      await invitationManager.accept(invite);
      getInvites();
    } catch (err) {
      console.log(err);
    } finally {
      console.log('Invites: The invite was successfully accepted');
    }
  }

  async function handleDeny(invite) {
    try {
      const invitationManager = user.getInvitationManager();
      await invitationManager.reject(invite);
      getInvites();
    } catch (err) {
      console.log(err);
    } finally {
      console.log('Invites: The invite was successfully denied');
    }
  }

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

  return (
    <div className={classes.paper}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {invites.data.map((invite) => (
          <Grid item xs={12} md={12} key={invite.uid}>
            <div>
              <List>
                <ListItem divider className={classes.listItem}>
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
                      onClick={() => {
                        handleDeny(invite);
                      }}
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
                      onClick={() => {
                        handleAccept(invite);
                      }}
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
