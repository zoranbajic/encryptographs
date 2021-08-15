import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import MenuIcon from '@material-ui/icons/Menu';
import { UserSessionContext } from '../store';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function DrawerMenu() {
  const classes = useStyles();
  const [userSession, setUserSession] = useContext(UserSessionContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuOpen(open);
  };

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer(true)}>
          <MenuIcon style={{ color: `white` }} />
        </Button>
        <Drawer anchor={'left'} open={menuOpen} onClose={toggleDrawer(false)}>
          <div
            className={classes.fullList}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem button component={RouterLink} to={'/home'} key={'Home'}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              {!userSession ? null : (
                <ListItem
                  button
                  component={RouterLink}
                  to={'/albums'}
                  key={'View Albums'}
                >
                  <ListItemIcon>
                    <PhotoAlbumIcon />
                  </ListItemIcon>
                  <ListItemText primary={'View Albums'} />
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
