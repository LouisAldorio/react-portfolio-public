import { Grid, Grow ,makeStyles} from '@material-ui/core';
import React from 'react'
import {useQuery} from '@apollo/client'
import {FETCH_GALLERY_VIDEOS_QUERY} from '../../../../../graphql/gallery'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    loading: {
      marginLeft: '47%',
    }
})

function VideoStudio() {
    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_GALLERY_VIDEOS_QUERY,{
        variables:{
            status: [1]
        }
    })

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <Grid container spacing={2}>
            {data && data.gallery.videos.map((item,index) => (
                <Grow in={true}  mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                    <Grid item xs={12} sm={12} md={3} key={index}>
                        <iframe width="100%" height="240" 
                            title={item.src}
                            src={item.src} 
                            frameBorder="0"
                            allowfullscreen="allowFullScreen"></iframe>        
                    </Grid>
                </Grow>              
            ))}
        </Grid>
    )
}

export default VideoStudio;