import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext, UserSessionContext } from '../context';
import { Features, Footer, HowGetStarted, Technologies } from '.';
import { Button, Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  centerColumn: {
    height: 750,
  },
  mainContent: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(8, 0, 6),
  },
}));

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const classes = useStyles();

  return (
    <main>
      <div className={classes.mainContent}>
        <Container maxWidth='sm'>
          <Typography
            component='h1'
            variant='h3'
            align='center'
            color='textPrimary'
            gutterBottom
          >
            Encryptographs
          </Typography>
          <Typography
            variant='h5'
            align='center'
            color='textSecondary'
            paragraph
          >
            A private, secure way to share photo albums with your friends and
            family.
          </Typography>
          <div className={classes.buttons}>
            <Grid container justifyContent='center'>
              {userSession && user ? (
                <Grid item>
                  <Button
                    component={RouterLink}
                    variant='contained'
                    color='primary'
                    to={{
                      pathname: '/albums',
                    }}
                  >
                    View Your Albums
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    component={RouterLink}
                    variant='contained'
                    color='primary'
                    to={{
                      pathname: '/signup',
                    }}
                  >
                    Signup
                  </Button>
                </Grid>
              )}
            </Grid>
          </div>
        </Container>
      </div>
      <Features />
      <HowGetStarted />
      <Technologies />
      <Footer />
    </main>
  );
};

export default Home;
