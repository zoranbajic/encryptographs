import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import MailIcon from '@material-ui/icons/Mail';
import PersonSharpIcon from '@material-ui/icons/PersonSharp';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  root: {
    flexGrow: 1,
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export default function InteractiveList() {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              <ListItem divider>
                <ListItemAvatar>
                  <Avatar>
                    <PersonSharpIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Marcela'
                  secondary='Marcela wants to share the album, "Galena Trip", with you'
                />
                <ListItemSecondaryAction>
                  <Button variant='outlined' edge='end' aria-label='deny'>
                    Deny
                  </Button>
                  <Button
                    edge='end'
                    variant='outlined'
                    aria-label='accept'
                    color='primary'
                  >
                    Accept
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem divider>
                <ListItemAvatar>
                  <Avatar>
                    <PersonSharpIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary='Marcela'
                  secondary='Monica wants to share the album, "Cool pictures" with you'
                />
                <ListItemSecondaryAction>
                  <Button
                    variant='outlined'
                    disabled
                    edge='end'
                    aria-label='deny'
                  >
                    Deny
                  </Button>
                  <Button
                    edge='end'
                    variant='outlined'
                    aria-label='accept'
                    color='primary'
                  >
                    Accept
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
