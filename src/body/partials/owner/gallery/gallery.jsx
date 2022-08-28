import { Button,makeStyles } from '@material-ui/core'
import React,{useContext,useState} from 'react'
import {AuthContext} from '../../../../auth/auth'
import {Redirect} from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../graphql/owner/gallery'
import CircularProgress from '@material-ui/core/CircularProgress';
import TopImagesList from './topImages/topImagesList'
import AudioList from './audios/audioList'
import { Grid } from '@material-ui/core'
import Carousel, { Modal, ModalGateway } from "react-images";
import {zoomingContext} from '../../../../App'
import ImagesList from './images/imagesList'
import VideosList from './videos/videosList'
import AddIcon from '@material-ui/icons/Add';
import CustomizedDialogs from './components/CreateDialog'
import TabsForms from './components/tabForms'

const useStyles = makeStyles({
    root: {
        marginBottom: 20
    },
    loading: {
        marginLeft: '47%'
    }
})

function GalleryConfig(props){
    const classes = useStyles()
    const {user} = useContext(AuthContext)

    const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

    const handleClickOpen = () => {
        setOpenCreateDialog(true);
    };

    const {loading,data} = useQuery(FETCH_GALLERY_CONFIG_DATA_QUERY)

    const [currentPhotoGroup,setCurrentPhotoGroup] = useState()

    const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = (index) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
        setIsPhotoNotZoom(false)
    };

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
        setIsPhotoNotZoom(true)
    };

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }
    
    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <div className={classes.root}>
            <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<AddIcon />} 
                onClick={handleClickOpen}                 
                style={{marginTop: 15}} 
            >Add Gallery Items</Button>

            <Grid container spacing={2}>
                <Grid md={6} sm={12} xs={12} button>
                    <h1>Top Images</h1>
                    <TopImagesList data={data && data.gallery.carousel_photos} 
                        openLightbox={openLightbox} 
                        closeLightbox={closeLightbox} 
                        isPhotoNotZoom={isPhotoNotZoom}
                        setCurrentPhotoGroup={setCurrentPhotoGroup} />
                </Grid>

                <Grid md={6} sm={12} xs={12} button>
                    <h1>Images With Category</h1>
                    <ImagesList data={data && data.gallery.photos_without_category}
                        imagesCategory={data && data.gallery.tabs_photos}
                        isPhotoNotZoom={isPhotoNotZoom}
                        openLightbox={openLightbox} 
                        closeLightbox={closeLightbox} 
                        setCurrentPhotoGroup={setCurrentPhotoGroup} />
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{marginTop: 20}}>
                <Grid md={4} sm={12} xs={12} button>
                    <h1>Videos</h1>
                    <VideosList data={data && data.gallery.videos}
                        isPhotoNotZoom={isPhotoNotZoom}/>
                </Grid>

                <Grid md={8} sm={12} xs={12} button>
                    <h1>Audios</h1>
                    <AudioList data={data && data.gallery.audios}
                        isPhotoNotZoom={isPhotoNotZoom}
                        openLightbox={openLightbox} 
                        closeLightbox={closeLightbox} 
                        setCurrentPhotoGroup={setCurrentPhotoGroup}/>
                </Grid>
            </Grid>

            <CustomizedDialogs 
                payload={<TabsForms handleClose={setOpenCreateDialog} 
                imagesCategory={data && data.gallery.tabs_photos}/>}
                setOpen={setOpenCreateDialog}
                open={openCreateDialog}/>
            

            <ModalGateway>
                {viewerIsOpen ? (  
                <Modal onClose={closeLightbox} >                    
                    <Carousel 
                        currentIndex={currentImage}
                        views={currentPhotoGroup.map(x => ({
                            src: x.cover || x.src,
                            srcset: x.srcSet,
                            caption: x.caption
                        }))}
                    />                  
                </Modal>               
                ) : null}
            </ModalGateway>           
        </div>
    )
}

export default GalleryConfig