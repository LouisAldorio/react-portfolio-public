import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {zoomingContext} from '../../../../App'
import { CardActionArea } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import './partials.css'
import Carousel, { Modal, ModalGateway } from "react-images";
import { useSnackbar } from 'notistack';
import { Divider } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

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
  divider: {
    marginBottom: 10,
    marginTop: 10
    },
    category: {
        margin: 5
    }
}));

export default function MediumArticleCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const link = props.data.link

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
            <Avatar aria-label="recipe" className={classes.avatar} src={props.author.image} onClick={
              () => {
                openLightbox()
              }
            }>
              L
            </Avatar>
          }
          title={props.data.author}
        />
      <CardActionArea href={link}>
        <CardContent>
          <Typography variant="body1" color="textPrimary" component="p">
            {props.data.title}
          </Typography>

          <br />

          <Typography variant="body2" color="textSecondary" component="p">
            Publish Date: {props.data.pubDate}
          </Typography>

          <Divider className={classes.divider}/>

          {
              props.data.categories.map((item,index) => (
                <Chip
                    key={index}
                    avatar={<Avatar>{item.charAt(0)}</Avatar>}
                    label={item}
                    clickable
                    className={classes.category}
                    color="primary"
                    deleteIcon={<DoneIcon />}
                />
              ))
          }
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton onClick={handleClick('success')}>
          <LinkIcon />
        </IconButton>
      </CardActions>
      <ModalGateway>
        {viewerIsOpen ? (  
        <Modal onClose={closeLightbox} >                    
            <Carousel 
                currentIndex={currentImage}
                views={[1].map(x => ({
                    src: props.author.image
                }))}
            />                  
        </Modal>               
        ) : null}
    </ModalGateway> 
    </Card>
  );
}
