import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogActions,Button,DialogTitle,DialogContent} from '@material-ui/core'
import {  DELETE_AUDIO_BY_ID, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

function DeleteAudioDialog(props){
    
    const handleClose = () => {
        props.setOpen(false);
    };

    const [DeleteAudio, { loading }] = useMutation(DELETE_AUDIO_BY_ID, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        audios: CurrentData.gallery.audios.filter(id => id !== result.data.gallery.audio.delete.id)
                    }
                }
            })
            handleClose()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.id,
        }
    })

    function Delete(){
        DeleteAudio()
    }
    
    return (
        <div>
            <Dialog onClose={handleClose} maxWidth={'100%'} open={props.open}>
                <DialogTitle >
                    Delete
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{marginBottom: 15}}>
                        Are You Sure to Delete This Audio ?     
                    </div> 
                    <audio controls width="300px">
                        <source src={props.src} type="audio/mpeg"/>
                        Your browser does not support the audio tag.
                    </audio>         
                </DialogContent>
                {
                    loading ? (<CircularProgress color="secondary"/>) : (
                        <DialogActions>
                            <Button autoFocus onClick={Delete} color="primary">
                                Yes
                            </Button>
                            <Button autoFocus onClick={handleClose} color="primary">
                                No
                            </Button>
                        </DialogActions>
                    )
                }              
            </Dialog>
        </div>
    );
}

export default DeleteAudioDialog