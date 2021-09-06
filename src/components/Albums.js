import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AlbumCard, AlbumDialog, Footer } from '.';
import { UserContext, UserSessionContext } from '../context';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Snackbar,
  Typography,
} from '@material-ui/core';
import PhotoAlbumOutlinedIcon from '@material-ui/icons/PhotoAlbumOutlined';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
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
  const [albums, setAlbums] = useState({});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [showProgress, setShowProgress] = useState(false);
  const [showError, setShowError] = useState(false);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  useEffect(() => {
    if (userSession) {
      getAlbums();
    }
  }, []);

  // Get collection object and save it to state
  async function getAlbums() {
    const collectionManager = user.getCollectionManager();
    try {
      setShowProgress(true);
      albumCollections = await collectionManager.list('encryptograph.album');
      setAlbums(albumCollections);
    } catch (err) {
      console.log(err);
      setShowError(true);
    } finally {
      setShowProgress(false);
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
      setShowProgress(true);
      const collectionManager = user.getCollectionManager();
      try {
        // Creates a collection
        const collection = await collectionManager.create(
          'encryptograph.album',
          {
            name: album.name,
            description: album.description,
          },
          '' // Empty content
        );
        // Uploads the collection
        await collectionManager.upload(collection);
        getAlbums();
      } catch (err) {
        console.log(err);
      } finally {
        setShowProgress(false);
      }
    }
  }

  const handleErrorClose = (evt, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowError(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {albums.data === undefined ||
      !albums.data.length ||
      albums.data.filter((data) => data.isDeleted === false).length === 0 ? (
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
              message={'Create'}
            />
          </div>
          <Snackbar
            open={showError}
            autoHideDuration={6000}
            onClose={handleErrorClose}
          >
            <Alert onClose={handleClose} severity='error'>
              You must confirm your email address before you can create albums.
            </Alert>
          </Snackbar>
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
                      album={album}
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
        </div>
      )}
      <Backdrop className={classes.backdrop} open={showProgress}>
        <CircularProgress color='primary' />
      </Backdrop>
      <Footer />
    </Box>
  );
}
