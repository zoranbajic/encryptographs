import React, { useContext, useState } from 'react';
import { AlbumDialog, DeleteDialog, ShareInviteDialog } from '.';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../context';
import * as Etebase from 'etebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core/';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function AlbumCard(props) {
  const classes = useStyles();
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openShareDialog, setOpenShareDialog] = useState(false);
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
    } catch (err) {
      console.log(err);
    } finally {
      return albumCollection;
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

  async function handleShareDialogClose(value, accessLevel) {
    setOpenShareDialog(false);
    if (value === 'Send') {
      try {
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
      } catch (err) {
        console.log(err);
      } finally {
        console.log('AlbumCard: Your invitation was successfully sent');
      }
    }
  }

  // This takes in either "Cancel" or "Save" as a value
  async function handleClose(value, album) {
    // This closes the dialog window
    setOpenAlbumDialog(false);
    if (value === 'Save') {
      try {
        const albumCollection = await getAlbum(album.uid);
        const meta = albumCollection.getMeta();
        albumCollection.setMeta({
          ...meta,
          name: album.name,
          description: album.description,
        });
        await collectionManager.upload(albumCollection);
      } catch (err) {
        console.log(err);
      } finally {
        getAlbums();
      }
    }
  }

  async function handleDeleteDialogClose(value, album) {
    // This closes the delete dialog
    setOpenDeleteDialog(false);
    // If the value is Agree, we delete the album and re-render Albums component
    if (value === 'Agree') {
      try {
        const albumCollection = await getAlbum(album.uid);
        albumCollection.delete();
        await collectionManager.upload(albumCollection);
      } catch (err) {
        console.log(err);
      } finally {
        getAlbums();
      }
    }
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea
          component={RouterLink}
          to={{
            pathname: '/gallery',
            state: { albumMeta: albumMeta, albumCollection: album },
          }}
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
              onClose={handleClose}
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
      </Card>
    </Grid>
  );
}
