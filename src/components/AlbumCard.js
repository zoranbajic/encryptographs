import React, { useContext, useState } from 'react';
import { AlbumDialog, DeleteDialog } from '../components';
import { UserContext, UserSessionContext } from '../store';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { EditOutlined } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import { Grid } from '@material-ui/core';
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
  const { name, description, uid, getAlbums } = props;
  const [user, setUser] = useContext(UserContext);
  let album = {
    name,
    description,
    uid,
  };
  let selectedValue = '';
  let selectedDeleteValue = '';

  const collectionManager = user.getCollectionManager();

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
        const albumCollection = await collectionManager.fetch(album.uid);
        const meta = albumCollection.getMeta();
        albumCollection.setMeta({
          ...meta,
          name: album.name,
          description: album.description,
        });
        await collectionManager.upload(albumCollection);
      } catch (error) {
        alert('An error occurred');
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
        const albumCollection = await collectionManager.fetch(album.uid);
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
        <CardActionArea>
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
            album={album}
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
            album={album}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
