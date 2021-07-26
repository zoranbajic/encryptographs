import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DrawerMenu } from '.';
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
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1018/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1018/250/150/',
    // },
    // {
    //   original: 'https://picsum.photos/id/1015/1000/600/',
    //   thumbnail: 'https://picsum.photos/id/1015/250/150/',
    // },
  ];

  const history = useHistory();
  const [userSession, setUserSession] = useContext(UserSessionContext);

  // If the user is not logged in, send them to the login page
  if (!userSession) {
    history.push('/login');
  } else {
  }

  return (
    <Container component='main'>
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container justifyContent='center'>
          <Grid item container display='flex' justifyContent='center'>
            <Typography variant='h4'>Album One</Typography>
          </Grid>
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
      </div>
    </Container>
  );
}
