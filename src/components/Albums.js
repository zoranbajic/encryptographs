import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AlbumCard, AlbumDialog } from '.';
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
  Link,
  Snackbar,
  Typography,
} from '@material-ui/core';
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
  const [albums, setAlbums] = useState({});
  const [open, setOpen] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);

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
      albumCollections = await collectionManager.list('encryptograph.album');
      setAlbums(albumCollections);
    } catch (err) {
      console.log(err);
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
        console.log('Albums - Your album was created', collection);
      } catch (err) {
        console.log(err);
      } finally {
        getAlbums();
      }
    }
  }

  return (
    <div>
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
          <Box mt={8}>
            <Copyright />
          </Box>
        </div>
      )}
    </div>
  );
}
