import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogActions,Button,DialogTitle,DialogContent} from '@material-ui/core'
import { DELETE_TOP_IMAGE_BY_ID, FETCH_GALLERY_CONFIG_DATA_QUERY } from '../../../../../graphql/owner/gallery';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

function DeleteTopImageDialog(props){
    
    const handleClose = () => {
        props.setOpen(false);
    };

    const [DeleteTopImage, { loading }] = useMutation(DELETE_TOP_IMAGE_BY_ID, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_GALLERY_CONFIG_DATA_QUERY})
            proxy.writeQuery({
                query: FETCH_GALLERY_CONFIG_DATA_QUERY,
                data: {
                    gallery: {
                        carousel_photos: CurrentData.gallery.carousel_photos.filter(id => id !== result.data.gallery.delete_top_image.id)
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
        DeleteTopImage()
    }
    
    return (
        <div>
            <Dialog onClose={handleClose} maxWidth={'100%'} open={props.open}>
                <DialogTitle >
                    Delete
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{marginBottom: 15}}>
                        Are You Sure to Delete This Top Image ?     
                    </div> 
                    <img src={props.src} width={'300px'}/>            
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

export default DeleteTopImageDialog