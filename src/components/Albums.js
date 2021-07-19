import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import * as Etebase from 'etebase';
import { AlbumCard, AlbumDialog, DeleteDialog } from '../components';
import { UserContext, UserSessionContext } from '../store';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.encryptographs.com'>
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Albums() {
  const classes = useStyles();
  const history = useHistory();
  let albumCollections = '';
  let selectedValue = '';
  let album = {
    name: '',
    description: '',
  };
  const [albums, setAlbums] = useState();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);

  const collectionManager = user.getCollectionManager();

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  useEffect(() => {
    getAlbums();
  }, []);

  // Get collection object and save it to state
  async function getAlbums() {
    try {
      albumCollections = await collectionManager.list('encryptograph.album');
      setAlbums(albumCollections);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  // This takes in either "Cancel" or "Create" as a value
  async function handleClose(value, album) {
    // This closes the dialog window
    setOpen(false);
    if (value === 'Create') {
      try {
        const collection = await collectionManager.create(
          'encryptograph.album',
          {
            name: album.name,
            description: album.description,
          },
          '' // Empty content
        );
        await collectionManager.upload(collection);
      } catch (error) {
        alert('Some error occurred');
      } finally {
        getAlbums();
      }
    }
  }

  return (
    <div>
      {!albums ? (
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PhotoAlbumOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              My Albums
            </Typography>
            <Typography>Looks like you don't have any albums.</Typography>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={handleClickOpen}
            >
              Create Album
            </Button>
            <AlbumDialog
              open={open}
              onClose={handleClose}
              selectedValue={selectedValue}
              album={album}
            />
            {/* </form> */}
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
          {/* <Backdrop className={classes.backdrop} open={showProgress}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'>
          Your username or password is incorrect.
        </Alert>
      </Snackbar> */}
        </Container>
      ) : (
        <div>
          <Container component='main'>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PhotoAlbumOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5' gutterBottom>
                My Albums
              </Typography>
              <Grid container className={classes.gridContainer} spacing={4}>
                {albums.data.map((album) =>
                  !album.isDeleted ? (
                    <AlbumCard
                      key={album.uid}
                      name={album.getMeta().name}
                      description={album.getMeta().description}
                      uid={album.uid}
                      getAlbums={getAlbums}
                    />
                  ) : null
                )}
              </Grid>
              <Button
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={handleClickOpen}
              >
                Create Album
              </Button>
              <AlbumDialog
                open={open}
                onClose={handleClose}
                selectedValue={selectedValue}
                album={album}
                message={'Create'}
              />
            </div>
          </Container>
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      )}
    </div>
  );
}
