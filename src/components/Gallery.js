import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Etebase from 'etebase';
import { Base64 } from 'js-base64';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext, UserSessionContext } from '../store';

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

export default function Gallery(props) {
  const classes = useStyles();
  const location = useLocation();
  const { name, description, uid } = location.state.album;
  const [images, setImages] = useState([]);

  const history = useHistory();
  const [userSession, setUserSession] = useContext(UserSessionContext);

  console.log('Gallery - Your pictures are - ', images);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  // This function encodes the images both in base64 to use for the image
  // gallery and as Uint8Arrays to save as items
  function encodeImages(evt) {
    const selectedFiles = Array.from(evt.target.files);
    let base64EncodedImage = '';
    // We set the input value to an empty string in case the user wants to
    // select the same files, otherwise the onChange won't fire
    evt.target.value = '';
    if (selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log('Gallery - File', selectedFiles[i].name);
        let fileReader = new FileReader();
        let imageFile = selectedFiles[i];

        fileReader.onloadend = function () {
          base64EncodedImage = fileReader.result;
          // We add to the image array using a wrapper function
          setImages((images) => [
            ...images,
            {
              original: base64EncodedImage,
              thumbnail: base64EncodedImage,
            },
          ]);

          // We use the Base64 library to convert the image to a Uint8Array
          const anArray = Base64.toUint8Array(base64EncodedImage);
        };
        // After a file is read it triggers the .onloadend function above
        fileReader.readAsDataURL(imageFile);
      }
    }
  }

  return (
    <Container component='main'>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justifyContent='center'>
          <Grid item container display='flex' justifyContent='center'>
            <Typography variant='h4'>{name}</Typography>
          </Grid>
          <Grid container item justifyContent='center'>
            {images.length === 0 ? (
              <ImageGallery
                items={images}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            ) : (
              <ImageGallery items={images} />
            )}
          </Grid>
          <Grid container item justifyContent='center'>
            <label htmlFor='upload-images'>
              <input
                style={{ display: 'none' }}
                id='upload-images'
                name='upload-images'
                type='file'
                onChange={encodeImages}
                multiple
              />
              <Button variant='contained' color='primary' component='span'>
                Add Images
              </Button>
            </label>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
