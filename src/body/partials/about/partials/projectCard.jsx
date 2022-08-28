import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './partials.css'

const useStyles = makeStyles({
  root: {
    marginRight: 10,
    marginBottom: 10,
    maxWidth: 400,
  },
});

export default function ProjectCard(props) {
  const classes = useStyles();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className={classes.root}>
      <CardActionArea href={props.data.deployment_link === '' ? props.data.github_link : props.data.deployment_link }>
        <img
            className={`smooth-image image-${
                imageLoaded ? 'visible' :  'hidden'
            }`}
            src={props.data.thumbnail}
            title="Contemplative Reptile"
            onLoad={() => {setImageLoaded(true)}}
        />
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.data.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.overview}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" href={props.data.github_link}>
          Github
        </Button>
        {
            props.data.deployment_link !== '' && (
                <Button size="small" color="primary" href={props.data.deployment_link}>
                    Launch
                </Button>
            )
        }
        
      </CardActions>
    </Card>
  );
}