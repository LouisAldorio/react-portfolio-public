import { Card, CardHeader,Avatar,CardActionArea,Grid,CardContent,Typography, CardActions } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import React,{useState,useContext} from 'react'
import { red } from '@material-ui/core/colors';
import {zoomingContext} from '../../../../../App'
import Carousel, { Modal, ModalGateway } from "react-images";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import WebOutlinedIcon from '@material-ui/icons/WebOutlined';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      marginBottom: 10,
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

function EducationCard(props){
    const classes = useStyles()
    const current = new Date()
    const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [zoomedImage,setZoomedImage] = useState(props.data.logo)

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(true);
        setIsPhotoNotZoom(false)
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
        setIsPhotoNotZoom(true)
    };

    const queryLink = `https://www.google.com/search?q=${props.data.name}`
    const addressLink = `https://www.google.com/search?q=${props.data.address}`

    return (
        <Card elevation={3} style={{width: '100%'}}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={props.data.logo} onClick={
                        () => {
                            setZoomedImage(props.data.logo)
                            openLightbox()
                        }
                    }>
                    L
                    </Avatar>
                }
                title={props.data.name}
                subheader={props.data.start_year + ' - ' + (props.data.end_year >= current.getFullYear() ? "Now" : props.data.end_year)}
            />
            
            <Grid container spacing={2}>
                <Grid xs={12} sm={12} md={5}  button onClick={() => {
                        setZoomedImage(props.data.image)
                        openLightbox()
                     }}>
                    <img
                        className={`smooth-image image-${
                            imageLoaded ? 'visible' :  'hidden'
                        } ${classes.avatar}`}
                        src={props.data.image}
                        title="Academy"
                        onLoad={() => {setImageLoaded(true)}}
                    />
                </Grid>
                <Grid xs={12} sm={12} md={7}  button>
                    <CardActionArea href={props.data.link} style={{height: '70%',padding: 0}}>
                        <CardContent>

                            <Typography variant="body1" color="textPrimary" component="p">
                                Address : 
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {props.data.address}
                            </Typography>

                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{marginBottom: 35}}>
                        <IconButton style={{marginLeft: 'auto'}} href={queryLink}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton href={addressLink}>                      
                            <LocationOnOutlinedIcon />
                        </IconButton>
                        <IconButton href={props.data.link} >
                            <WebOutlinedIcon />
                        </IconButton>
                    </CardActions>
                </Grid>
            </Grid>
            
            <ModalGateway>
                {viewerIsOpen ? (  
                <Modal onClose={closeLightbox} >                    
                    <Carousel 
                        currentIndex={currentImage}
                        views={[1].map(x => ({
                            src: zoomedImage
                        }))}
                    />                  
                </Modal>               
                ) : null}
            </ModalGateway> 
        </Card>
    )
}

export default EducationCard