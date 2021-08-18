import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { DeleteDialog } from '.';
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
import { UserContext, UserSessionContext } from '../context';

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
  const album = location.state.albumCollection;
  const [images, setImages] = useState([]);
  const [imageUids, setImageUids] = useState([]);
  let uidArray = [];
  const galleryRef = useRef();

  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  let selectedDeleteValue = '';

  const collectionManager = user.getCollectionManager();
  const photoManager = collectionManager.getItemManager(album);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  useEffect(() => {
    images.length ? null : getPhotos();
  }, []);

  const handleDeleteDialogClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  // Get any photos already saved in the album on Etebase
  async function getPhotos() {
    let initialPhotoArray = [];
    let uidArray = [];
    let photos = [];
    let photoList = await photoManager.list();

    // We need to remove any photos that have been marked as deleted
    for (const photo of photoList.data) {
      photo.isDeleted ? null : photos.push(photo);
    }

    for (const photo of photos) {
      let photoContent = await photo.getContent();
      let base64Photo = await cleanUp(Base64.fromUint8Array(photoContent));
      initialPhotoArray.push(base64Photo);
      uidArray.push(photo.uid);
    }

    updateState(initialPhotoArray, uidArray);

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
      updateState(base64Array, uidArray);
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
        uidArray.push(photo.uid);

        return imagesArray;
      },
      Promise.resolve([])
    );

    // Upload the images
    await photoManager.batch(itemArray);
    return itemArray;
  }

  function updateState(base64Array, uidArray) {
    // On the initial render, we can set the Images state to the array.
    // Otherwise, we will append the images to state
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

    // We need to maintain a list of the uids for each image since this
    // information cannot be stored within any of the props of the images

    for (const uid of uidArray) {
      setImageUids((imageUids) => [...imageUids, uid]);
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

  async function handleDeleteDialogClose(value) {
    const galleryElement = galleryRef.current;
    const indexOfPhoto = galleryElement.getCurrentIndex();
    const photoUid = imageUids[indexOfPhoto];

    // This closes the delete dialog
    setOpenDeleteDialog(false);
    if (value === 'Agree') {
      try {
        const photo = await photoManager.fetch(photoUid);
        photo.delete();
        await photoManager.batch([photo]);
      } catch (err) {
        console.log(err);
      } finally {
        setImageUids((previous) =>
          previous.filter((uid, index) => index !== indexOfPhoto)
        );
        setImages((previous) =>
          previous.filter((uid, index) => index !== indexOfPhoto)
        );
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
                ref={galleryRef}
              />
            ) : (
              <ImageGallery items={images} ref={galleryRef} />
            )}
          </Grid>
          {album.accessLevel !== 0 ? (
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
                  onClick={handleDeleteDialogClickOpen}
                >
                  Delete Image
                </Button>
                <DeleteDialog
                  open={openDeleteDialog}
                  onClose={handleDeleteDialogClose}
                  selectedValue={selectedDeleteValue}
                  message={'image'}
                />
              </label>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </Container>
  );
}
