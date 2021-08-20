import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { InviteContext, UserContext, UserSessionContext } from '../context';
import { DrawerMenu } from '.';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function Navbar() {
  // Styling and forms
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  // Pull in our state from Context
  const [user, setUser] = useContext(UserContext);
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [invites, setInvites] = useContext(InviteContext);

  // const [numberOfInvites, setNumberOfInvites] = useState(0);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      getContentAnchorEl={null}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={ChangePassword}>Change Password</MenuItem>
      <MenuItem onClick={PublicKey}>View Public Key</MenuItem>
      <MenuItem onClick={Logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show new invites' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {
    user !== '' ? getInvites() : null;
  }, [user]);

  async function Logout() {
    handleMenuClose();
    await user.logout();
    setUserSession('');
    setUser('');
    history.push('/');
  }

  function ChangePassword() {
    handleMenuClose();
    history.push('/changepassword');
  }

  function PublicKey() {
    handleMenuClose();
    history.push('/publickey');
  }

  async function getInvites() {
    const invitationManager = user.getInvitationManager();
    const invitations = await invitationManager.listIncoming();
    setInvites(invitations);
  }

  return (
    <div className={classes.grow}>
      <AppBar position='static' style={{ position: 'fixed', top: 0, left: 0 }}>
        <Toolbar>
          <DrawerMenu />
          <Typography variant='h6' className={classes.title} noWrap>
            <Link color='inherit' component={RouterLink} to={'/'}>
              Encryptographs
            </Link>
          </Typography>
          <div className={classes.grow} />
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
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label='show new invites'
                  color='inherit'
                  component={RouterLink}
                  to={'/invites'}
                >
                  <Badge
                    badgeContent={!invites.data ? 0 : invites.data.length}
                    color='secondary'
                  >
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
