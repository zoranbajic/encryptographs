import React, { useContext, useEffect, useRef, useState } from 'react';
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
  const { name, description, uid } = location.state.albumMeta;
  const [images, setImages] = useState([]);
  const galleryRef = useRef();

  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);

  const collectionManager = user.getCollectionManager();
  const photoManager = collectionManager.getItemManager(
    location.state.albumCollection
  );

  console.log('Gallery: Your album is: ', location.state.albumCollection);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  useEffect(() => {
    images.length ? null : getPhotos();
  }, []);

  // Get any photos already saved in the album on Etebase
  async function getPhotos() {
    console.log('Gallery: getPhotos has been called');
    let initialPhotoArray = [];
    const photos = await photoManager.list();
    console.log('Gallery: Your item collection is', photos);

    for (const photo of photos.data) {
      let photoContent = await photo.getContent();
      let base64Photo = await cleanUp(Base64.fromUint8Array(photoContent));
      initialPhotoArray.push(base64Photo);
    }

    updateState(initialPhotoArray);

    async function cleanUp(fullString) {
      function findAndInsertAfter(fullString, searchString, value) {
        const insertPosition =
          fullString.indexOf(searchString) + searchString.length;
        const newString =
          fullString.slice(0, insertPosition) +
          value +
          fullString.slice(insertPosition);
        return newString;
      }

      function findAndInsertBefore(fullString, searchString, value) {
        const insertPosition = fullString.indexOf(searchString);
        const newString =
          fullString.slice(0, insertPosition) +
          value +
          fullString.slice(insertPosition);
        return newString;
      }

      const firstPass = findAndInsertAfter(fullString, 'data', ':');
      const secondPass = findAndInsertBefore(firstPass, 'base64', ';');
      const thirdPass = findAndInsertAfter(secondPass, 'base64', ',');

      return thirdPass;
    }
  }

  // This gets the image in the format we need, encrypts it, uploads it, and
  // updates state
  async function processFile(evt) {
    try {
      const base64Array = await encodeImagesToBase64(evt);
      const itemArray = await uploadImages(base64Array);
      updateState(base64Array);
    } catch (err) {
      console.log(err);
    }
  }

  // This function encodes the images both in base64 to use for the image
  // gallery
  async function encodeImagesToBase64(evt) {
    // Returns base64 strings of all images
    function getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
    // The array of promises we will return
    const promises = [];
    const fileList = Array.from(evt.target.files);
    // We set the input value to an empty string in case the user wants to
    // select the same files, otherwise the onChange won't fire
    evt.target.value = '';

    // Loops through all images and adds them to the promises array
    for (let i = 0; i < fileList.length; i++) {
      promises.push(getBase64(fileList[i]));
    }

    // Returns the array of base64 strings
    return await Promise.all(promises);
  }

  async function uploadImages(secondStep) {
    const itemArray = await secondStep.reduce(
      async (previousPromise, dataString) => {
        let imagesArray = await previousPromise;
        // We use the Base64 library to convert the images to Uint8Arrays which
        // are required to use in Etebase
        const ImageInt8Array = Base64.toUint8Array(dataString);

        const photo = await photoManager.create(
          {
            type: 'file',
            name: 'image.png',
            mtime: new Date().getTime(),
          },
          ImageInt8Array
        );

        imagesArray.push(photo);

        return imagesArray;
      },
      Promise.resolve([])
    );

    // Upload the images
    await photoManager.batch(itemArray);
    console.log('Gallery: Your item array is', itemArray);
    return itemArray;
  }

  function updateState(base64Array) {
    if (images.length === 0) {
      let galleryArray = [];
      // Convert the array to the format required by the Gallery
      for (const image of base64Array) {
        galleryArray.push({
          original: image,
          thumbnail: image,
        });
      }
      setImages(galleryArray);
    } else {
      // We add to the image array using a wrapper function
      for (const image of base64Array) {
        setImages((images) => [
          ...images,
          { original: image, thumbnail: image },
        ]);
      }
    }

    // The below code was an attempt to concat of array of objects to state
    // however while it works it does not trigger a re-render. Will save this
    // code and research if this is better than the above approach and if so,
    // how to get it to work

    // const galleryArray = base64Array.reduce(function (
    //   imageAccumulator,
    //   currentImage
    // ) {
    //   imageAccumulator.push({
    //     original: currentImage,
    //     thumbnail: currentImage,
    //   });
    //   return imageAccumulator;
    // },
    // []);

    // setImages((images) => [images.concat(galleryArray)]);
  }

  function handleDelete() {
    const galleryElement = galleryRef.current;
    console.log('The current index is', galleryElement.getCurrentIndex());
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
                ref={galleryRef}
              />
            ) : (
              <ImageGallery items={images} ref={galleryRef} />
            )}
          </Grid>
          <Grid container item justifyContent='center'>
            <label htmlFor='upload-images'>
              <input
                style={{ display: 'none' }}
                id='upload-images'
                name='upload-images'
                type='file'
                onChange={processFile}
                multiple
              />
              <Button variant='contained' color='primary' component='span'>
                Add Images
              </Button>
            </label>
            <label htmlFor='delete-image'>
              <Button
                variant='contained'
                color='primary'
                component='span'
                onClick={handleDelete}
              >
                Delete Image
              </Button>
            </label>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
