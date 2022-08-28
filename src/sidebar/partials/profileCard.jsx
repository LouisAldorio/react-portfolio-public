
import React,{useState,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow'
import {zoomingContext} from '../../App'
import Carousel, { Modal, ModalGateway } from "react-images"
import { useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        marginTop: 20,
    },
    media: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },

}));

export default function MediaCard(props) {
    const classes = useStyles();
    // eslint-disable-next-line
    const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)
    const currentYear = new Date().getFullYear()

    const [currentImage, setCurrentImage] = useState(0);
    // eslint-disable-next-line
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

    const { enqueueSnackbar } = useSnackbar()
    const handleClick = (variant) => () => {
        navigator.clipboard.writeText(window.location.host)
        enqueueSnackbar('Link Copied To Clipboard!', { variant });
    };

  return (
    <Grow in={props.isOpen} direction="right" mountOnEnter unmountOnExit timeout={{enter: 1500,exit: 200}}>
        <Paper  className={classes.paper}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        onClick={openLightbox}
                        component="img"
                        alt="Avatar"
                        image={props.data.avatar}
                        title="Software Engineer"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Hello, I am Louis, currently {currentYear - props.data.born_date} years old. I am a Software Engineer And Machine Learning Enthusiast.
                        Feel free to explore this site and get to know more about me. 
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {
                        handleClick("success")()
                    }}>
                        Share
                    </Button>
                </CardActions>
            </Card>

            
            <ModalGateway>
                {viewerIsOpen ? (  
                <Modal onClose={closeLightbox} >                    
                    <Carousel 
                        currentIndex={currentImage}
                        views={[1].map(x => ({
                            src: props.data.avatar
                        }))}
                    />                  
                </Modal>               
                ) : null}
            </ModalGateway> 
        </Paper>
    </Grow>
    
  );
}