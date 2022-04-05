import React, { useContext, useState } from 'react';
import { AlbumDialog, DeleteDialog, ShareInviteDialog } from '.';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../context';
import * as Etebase from 'etebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from '@material-ui/core/';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ShareIcon from '@material-ui/icons/Share';
import MuiAlert from '@material-ui/lab/Alert';
import { LocalPrintshopSharp } from '@material-ui/icons';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function AlbumCard(props) {
  const classes = useStyles();
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [inviteError, setInviteError] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const { album, name, description, uid, getAlbums } = props;
  const [user, setUser] = useContext(UserContext);
  let albumMeta = {
    name,
    description,
    uid,
  };
  let nameValue = '';
  let selectedValue = '';
  let selectedDeleteValue = '';

  const collectionManager = user.getCollectionManager();

  async function getAlbum(uid) {
    let albumCollection = {};
    try {
      albumCollection = await collectionManager.fetch(uid);
      return albumCollection;
    } catch (err) {
      console.log(err);
    }
  }

  const handleAlbumDialogClickOpen = () => {
    setOpenAlbumDialog(true);
  };

  const handleDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleShareDialogClickOpen = () => {
    setOpenShareDialog(true);
  };

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInviteSuccess(false);
  };

  const handleErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInviteError(false);
  };

  async function handleShareDialogClose(value, accessLevel) {
    setOpenShareDialog(false);
    if (value === 'Send') {
      try {
        setShowProgress(true);
        const invitationManager = user.getInvitationManager();
        const invitee = await invitationManager.fetchUserProfile(
          accessLevel.user
        );
        await invitationManager.invite(
          album,
          accessLevel.user,
          invitee.pubkey,
          Etebase.CollectionAccessLevel[accessLevel.userAccess]
        );
        setInviteSuccess(true);
      } catch (err) {
        setInviteError(true);
      } finally {
        setShowProgress(false);
      }
    }
  }

  // This takes in either "Cancel" or "Save" as a value
  async function handleEditClose(value, album) {
    // This closes the dialog window
    setOpenAlbumDialog(false);
    if (value === 'Save') {
      try {
        setShowProgress(true);
        const albumCollection = await getAlbum(album.uid);
        const meta = albumCollection.getMeta();
        albumCollection.setMeta({
          ...meta,
          name: album.name,
          description: album.description,
        });
        await collectionManager.upload(albumCollection);
        getAlbums();
      } catch (err) {
        console.log(err);
      } finally {
        setShowProgress(false);
      }
    }
  }

  async function handleDeleteDialogClose(value, album) {
    // This closes the delete dialog
    setOpenDeleteDialog(false);
    // If the value is Agree, we delete the album and re-render Albums component
    if (value === 'Agree') {
      try {
        setShowProgress(true);
        const albumCollection = await getAlbum(album.uid);
        albumCollection.delete();
        await collectionManager.upload(albumCollection);
        getAlbums();
      } catch (err) {
        console.log(err);
      } finally {
        setShowProgress(false);
      }
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        {/* <CardActionArea
          component={RouterLink}
          to={{
            pathname: '/gallery',
            state: { albumMeta: albumMeta, albumCollection: album },
          }}
        > */}
        <CardActionArea
          component={RouterLink}
          to={'/gallery'}
          state={{ albumMeta: albumMeta, albumCollection: album }}
        >
          <CardHeader title={name} />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        {album.accessLevel !== 0 ? (
          <CardActions>
            <IconButton
              size='small'
              color='primary'
              onClick={handleShareDialogClickOpen}
            >
              <ShareIcon />
            </IconButton>
            <ShareInviteDialog
              open={openShareDialog}
              onClose={handleShareDialogClose}
              nameValue={nameValue}
            />
            <div style={{ flex: '1 0 0' }} />

            <IconButton
              size='small'
              color='primary'
              onClick={handleAlbumDialogClickOpen}
            >
              <EditOutlined />
            </IconButton>

            <AlbumDialog
              open={openAlbumDialog}
              onClose={handleEditClose}
              selectedValue={selectedValue}
              album={albumMeta}
              message={'Edit'}
            />

            <IconButton
              size='small'
              color='secondary'
              onClick={handleDeleteDialogClickOpen}
            >
              <DeleteOutlined />
            </IconButton>

            <DeleteDialog
              open={openDeleteDialog}
              onClose={handleDeleteDialogClose}
              selectedValue={selectedDeleteValue}
              album={albumMeta}
              message={'album'}
            />
          </CardActions>
        ) : null}
        <Backdrop className={classes.backdrop} open={showProgress}>
          <CircularProgress color='primary' />
        </Backdrop>
        <Snackbar
          open={inviteSuccess}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <Alert onClose={handleSuccessClose} severity='success'>
            Your invite was successfully sent!
          </Alert>
        </Snackbar>
        <Snackbar
          open={inviteError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleErrorClose} severity='error'>
            The user entered does not exist.
          </Alert>
        </Snackbar>
      </Card>
    </Grid>
  );
}
