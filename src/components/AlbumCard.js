import React, { useContext, useState } from 'react';
import { AlbumDialog, DeleteDialog, Gallery } from '../components';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext, UserSessionContext } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core/';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { EditOutlined } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function AlbumCard(props) {
  const classes = useStyles();
  const [openAlbumDialog, setOpenAlbumDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { album, name, description, uid, getAlbums } = props;
  const [user, setUser] = useContext(UserContext);
  let albumMeta = {
    name,
    description,
    uid,
  };
  let selectedValue = '';
  let selectedDeleteValue = '';

  const collectionManager = user.getCollectionManager();

  async function getAlbum(uid) {
    let albumCollection = {};
    try {
      albumCollection = await collectionManager.fetch(uid);
    } catch (error) {
      console.log(error);
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
      } catch (error) {
        alert('An error occurred in editing your data');
        console.log('Your editing error is ', error);
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
        const albumCollection = getAlbum(album.uid);
        albumCollection.delete();
        await collectionManager.upload(albumCollection);
      } catch (error) {
        alert('An error occured');
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
        <CardActions>
          <IconButton size='small' color='primary'>
            <ShareIcon />
          </IconButton>
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
      </Card>
    </Grid>
  );
}
