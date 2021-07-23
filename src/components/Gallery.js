import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrawerMenu } from '.';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext, UserSessionContext } from '../store';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Gallery() {
  const classes = useStyles();
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
  ];

  const history = useHistory();
  const [userSession, setUserSession] = useContext(UserSessionContext);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  return (
    <Grid container justifyContent='center'>
      <Grid container item justifyContent='center'>
        <ImageGallery items={images} />
      </Grid>
      <Grid container item justifyContent='center'>
        <Button
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={() => {
            alert('This was clicked');
          }}
        >
          Add Images
        </Button>
      </Grid>
    </Grid>
  );
}
