import React, { useState,useContext ,useEffect,useRef} from 'react'
import { Grid,Button, makeStyles} from '@material-ui/core'
import Carousel, { Modal, ModalGateway } from "react-images";
import ScrollableTabsButtonAuto from './tabs/tabs'
import {zoomingContext} from '../../../../../App'
import Slide from '@material-ui/core/Slide';
import Delayed from '../../../../../utils/delay';
import { useQuery } from '@apollo/client';
import { FETCH_GALLERY_IMAGES_QUERY } from '../../../../../graphql/gallery';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
  loading: {
    marginLeft: '47%',
  }
})

function PhotoStudio() {
    const classes = useStyles()

    const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)
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

    const {loading,data} = useQuery(FETCH_GALLERY_IMAGES_QUERY,{
      variables:{
        status: [1],
        nodeStatus: [1]
      }
    })
    useInterval(() => {
      setIndex((index + 1) % (data ? data.gallery.carousel_photos.length : 1));
    }, 3000);

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <Grid container spacing={2}>
            <Delayed waitBeforeShow={200}>
                <Slide in={true} direction="right" mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                    <Grid item xs={12} sm={12} md={6}>
                        
                        <div onClick={openLightbox} >
                            <Carousel                             
                              currentIndex={index}                 
                              views={data && data.gallery.carousel_photos.map(x => ({
                                  ...x,
                                  srcset: x.srcSet,
                                  caption: x.caption
                              }))}/> 
                              
                        </div>
                        <ModalGateway>
                            {viewerIsOpen ? (  
                            <Modal onClose={closeLightbox} >                    
                                <Carousel 
                                    currentIndex={currentImage}
                                    views={data && data.gallery.carousel_photos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.caption
                                    }))}
                                />                  
                            </Modal>               
                            ) : null}
                        </ModalGateway> 
                    </Grid>
                </Slide>
              </Delayed>
              <Grid item xs={12} sm={12} md={6} >                  
                {
                  loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
                    <Delayed waitBeforeShow={500}>
                      <ScrollableTabsButtonAuto photos={data && data.gallery.tabs_photos}/>
                    </Delayed>
                  )
                }                                                                                                             
              </Grid>  
          </Grid>
    )
}

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      let id = setInterval(() => {
        savedCallback.current();
      }, delay);
      return () => clearInterval(id);
    }, [delay]);
  }

export default PhotoStudio;