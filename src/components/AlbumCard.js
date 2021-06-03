import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import ShareIcon from '@material-ui/icons/Share';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function AlbumCard(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardHeader title={props.name} />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size='small' color='primary'>
            <ShareIcon />
          </IconButton>
          <div style={{ flex: '1 0 0' }} />
          <IconButton size='small' color='secondary'>
            <DeleteOutlined />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
