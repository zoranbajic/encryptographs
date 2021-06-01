import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
          <CardMedia
            component='img'
            alt={props.name}
            height='140'
            image='/static/images/cards/contemplative-reptile.jpg'
            title={props.name}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {props.name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' color='primary'>
            Share
          </Button>
          <Button size='small' color='primary'>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
