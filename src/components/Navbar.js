import React, { useContext, useEffect } from 'react';
import * as Etebase from 'etebase';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const [user, setUser] = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    const loggedInStatus = async (user) => {
      if (user) {
        const etebase = await Etebase.Account.restore(user);
        console.log('The navbar etebase info is', etebase);
      }
    };
    loggedInStatus(user);
  }, []);

  console.log('The navbar user info is:', user);

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ position: 'fixed', top: 0, left: 0 }}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' className={classes.title}>
            <Link color='inherit' component={RouterLink} to={'/'}>
              Encryptographs
            </Link>
          </Typography>

          <Button color='inherit' component={RouterLink} to={'/signup'}>
            Signup
          </Button>
          <Button color='inherit' component={RouterLink} to={'/login'}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
