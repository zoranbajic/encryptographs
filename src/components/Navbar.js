import React, { useContext, useEffect } from 'react';
import * as Etebase from 'etebase';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../store';
import { UserSessionContext } from '../store';
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
  // Pull in our state from Context
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const classes = useStyles();

  useEffect(() => {
    console.log('The user in the navbar is:', user);
    // const loggedInStatus = async (userSession) => {
    //   if (userSession) {
    //     const etebase = await Etebase.Account.restore(userSession);
    //     console.log('The navbar etebase info is', etebase);
    //   }
    // };
    console.log('The navbar session is', userSession);
    // loggedInStatus(userSession);
  });

  const history = useHistory();
  async function Logout() {
    await user.logout();
    setUser('');
    setUserSession('');
    history.push('/');
  }

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
          {!userSession ? (
            <div>
              <Button color='inherit' component={RouterLink} to={'/signup'}>
                Signup
              </Button>
              <Button color='inherit' component={RouterLink} to={'/login'}>
                Login
              </Button>
            </div>
          ) : (
            <div>
              <Button color='inherit' onClick={Logout}>
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
