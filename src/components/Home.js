import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../store';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  centerColumn: {
    height: 750,
  },
}));

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();
  return (
    <Grid container direction='column' align='center'>
      <Grid
        item
        container
        className={classes.centerColumn}
        direction='column'
        display='flex'
        justify='center'
      >
        <Typography variant='h2'>
          {user ? `Welcome ${user.user.username}!` : `Welcome`}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
