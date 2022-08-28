import { Grow,Grid } from '@material-ui/core';
import React from 'react'
import { makeStyles} from '@material-ui/core'
import { useQuery } from '@apollo/client';
import {FETCH_GALLERY_AUDIOS_QUERY} from '../../../../../graphql/gallery'
import CircularProgress from '@material-ui/core/CircularProgress';
import Audio from '../../../../../utils/audioPlayerHelper/audio'


const useStyles = makeStyles({
    loading: {
      marginLeft: '47%',
    }
})

function AudioStudio() {
    const classes = useStyles()

    const {loading, data} = useQuery(FETCH_GALLERY_AUDIOS_QUERY,{
        variables: {
            status: [1]
        }
    })

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (    
        <Grid container spacing={2}>
            {data && data.gallery.audios.map((song,index) => (
                <Grow in={true}  mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                    <Grid item xs={12} sm={12} md={4} key={index}>
                        <Audio song={song}/>
                    </Grid>
                </Grow>  
            ))}
        </Grid>
    )
}

export default AudioStudio;