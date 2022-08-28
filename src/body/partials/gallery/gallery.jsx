import React, { useState } from 'react'
import { Typography,Grow } from '@material-ui/core'
import './gallery.css'
import PhotoStudio from './components/photo/photo'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../footer/footer';
import Delayed from '../../../utils/delay'
import VideoStudio from './components/video/video';
import AudioStudio from './components/audio/audio';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginTop: 10,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(22),
    color: theme.palette.text.secondary,
  },
}));

function Galleries() {

  const classes = useStyles();

  const [photos,setPhotos] = useState(false)
  const [videos,setVideos] = useState(false)
  const [audios,setAudios] = useState(false)
  

  const handleChange = (panel) => (event, isExpanded) => {
    if(panel == 'photos'){
      setPhotos(!photos)
    }else if(panel == 'videos'){
      setVideos(!videos)
    }else if(panel == 'audios'){
      setAudios(!audios)
    }
  };

  return (
      <React.Fragment>
          <Typography variant="h3" component="h3" style={{marginBottom: 10}}>
              Gallery
          </Typography>
          <div className={classes.root}>
            <Delayed waitBeforeShow={0 * 400}> 
              <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <Accordion expanded={photos} onChange={handleChange('photos')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <img src={"https://i.pinimg.com/originals/0a/b2/cb/0ab2cb8c7bc008f3b8b91a4b352c55f2.gif"} height="50px"
                    width="50px"/>
                    <Typography className={classes.heading}>Photos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {photos && (                 
                        <PhotoStudio />                 
                    )}               
                  </AccordionDetails>
                </Accordion>
              </Grow>
            </Delayed>
            <Delayed waitBeforeShow={1 * 400}> 
              <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <Accordion expanded={videos} onChange={handleChange('videos')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <img src={"https://cliply.co/wp-content/uploads/2019/07/371907120_YOUTUBE_ICON_400px.gif"} height="50px"
                    width="50px"/>
                    <Typography className={classes.heading}>Videos</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {videos && (
                      <VideoStudio />
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grow>
            </Delayed>
            <Delayed waitBeforeShow={2 * 400}> 
              <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <Accordion expanded={audios} onChange={handleChange('audios')}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <img src="https://i.pinimg.com/originals/ab/45/bb/ab45bb4451536652faca51ae4f42d5dd.gif" alt=""
                    height="50px"
                    width="50px"/>
                    <Typography className={classes.heading}>Audios</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {audios && (
                      <AudioStudio />
                    )}
                  </AccordionDetails>
                </Accordion>
              </Grow>
            </Delayed>
          </div>
          <Footer />
      </React.Fragment> 
    )
}
export default Galleries;