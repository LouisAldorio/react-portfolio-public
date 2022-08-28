import React,{useState,useCallback,useContext, useEffect} from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Grow, Slide,Button } from '@material-ui/core'
import {zoomingContext} from '../../../../../../App'
import Photo from '../config/config';

let limit = 8

function TabPanel(props) {
  let { children, value, index,openLightbox,photos ,...other } = props;

  const imageRenderer = ({ index, left, top, key, photo }) => (
      <Photo
        openLightbox={openLightbox}       
        key={key}
        margin={'2px'}
        index={index}
        photo={photo}
        left={left}
        top={top}
      />
    );

  //pagination simulation
  let totalPage = Math.ceil(photos.length / limit)
  const [displayed,setDisplayed] = useState([])
  const [page , setPage] = useState(1)

  useEffect(() => {
    let offset = limit * (page - 1)
    setDisplayed([...displayed,...photos.slice(offset,limit + offset)])
  },[page])

  const LoadMore = () => {
    setPage(page + 1)
  }

  return (  
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Grow in={true}  mountOnEnter unmountOnExit timeout={{enter: 1500,exit: 1500}} >
            <Box p={3}>
              <Typography>
                <Gallery photos={displayed} renderImage={imageRenderer} />
                {children}

                {page < totalPage && 
                  (<Button 
                    style={{float: 'right',marginRight: '5%',marginTop: '3%'}}  
                    color="primary" 
                    onClick={LoadMore}>
                    Load More
                  </Button>)}
                  
              </Typography>
            </Box>
          </Grow>
        )}
      </div>  
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto(props) {
  console.log(props.photos)

  const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue); 
  };

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo,  index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
      setIsPhotoNotZoom(false)
  }, []);

  const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
      setIsPhotoNotZoom(true)
  };

  return (
    <div className={classes.root}>
      <Slide in={true} direction="down" mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {props.photos.map((item,index) => (
                <Tab label={item.category} {...a11yProps(index)} />
            ))}
          </Tabs>
        </AppBar>
      </Slide>

      {props.photos.map((item,index) => (
          <TabPanel value={value} index={index} photos={item.photos.map((photo,index) => {
            return {
              src: photo.src,
              width: photo.width,
              height: photo.height
            }
          })} openLightbox={openLightbox} key={index}>

              <ModalGateway>
                  {viewerIsOpen ? (  
                    <Modal onClose={closeLightbox} >                    
                        <Carousel 
                          currentIndex={currentImage}
                          views={item.photos.map(x => ({
                              ...x,
                              srcset: x.srcSet,
                              caption: x.title
                          }))}
                        />                  
                    </Modal>               
                  ) : null}
              </ModalGateway>               
          </TabPanel>
      ))}
    </div>
  );
}
