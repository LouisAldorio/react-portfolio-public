import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {zoomingContext} from '../../../../App'
import { CardActionArea } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import './partials.css'
import Carousel, { Modal, ModalGateway } from "react-images";
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    marginBottom: 10,
    marginRight: 10,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer"
  },
}));

export default function WorkingExperiencedCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const link = `https://www.google.com/search?q=${props.data.company_name.substring(0,2) == 'PT' ? props.data.company_name : props.data.address}&oq=${props.data.company_name.substring(0,2) == 'PT' ? props.data.company_name : props.data.address}`

  const handleClick = (variant) => () => {
    navigator.clipboard.writeText(link)
    enqueueSnackbar('Link Copied To Clipboard!', { variant });
  };

  //zoom
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [index,setIndex] = useState(0)

    const openLightbox = () => {
        setCurrentImage(index);
        setViewerIsOpen(true);
        setIsPhotoNotZoom(false)
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
        setIsPhotoNotZoom(true)
    };

  return (
    <Card className={classes.root}>
      <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} src={props.data.company_logo} onClick={
              () => {
                openLightbox()
              }
            }>
              L
            </Avatar>
          }
          title={props.data.company_name}
          subheader={props.data.start_date + ' - ' + props.data.end_date}
        />
      <CardActionArea href={link}>
        <img
            className={`smooth-image image-${
                imageLoaded ? 'visible' :  'hidden'
            }`}
            src={props.data.image}
            title="Contemplative Reptile"
            onLoad={() => {setImageLoaded(true)}}
        />
        <CardContent>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.data.address}
          </Typography>

          <br />

          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.overview}
          </Typography>

        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick('success')}>
          <LinkIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Typography variant="body1" color="textPrimary">
                Position: 
            </Typography>
            <Typography variant="body2" color="textSecondary">
                {props.data.position}
            </Typography>
            <br />
            <Typography paragraph>
                {props.data.description}
            </Typography>
        </CardContent>
      </Collapse>
      <ModalGateway>
        {viewerIsOpen ? (  
        <Modal onClose={closeLightbox} >                    
            <Carousel 
                currentIndex={currentImage}
                views={[1].map(x => ({
                    src: props.data.company_logo
                }))}
            />                  
        </Modal>               
        ) : null}
    </ModalGateway> 
    </Card>
  );
}
