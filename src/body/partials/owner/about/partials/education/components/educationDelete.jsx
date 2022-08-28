import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogActions,Button,DialogTitle,DialogContent} from '@material-ui/core'
import {  DELETE_EDUCATION_BY_ID, FETCH_CONFIG_ABOUT_EDUCATION_QUERY } from '../../../../../../../graphql/owner/about';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

function DeleteEducationDialog(props){
    
    const handleClose = () => {
        props.setOpen(false);
    };

    const [DeleteEducation, { loading }] = useMutation(DELETE_EDUCATION_BY_ID, {
        update(proxy, result) {
            handleClose()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: props.id,
        },
        refetchQueries:[{
            query: FETCH_CONFIG_ABOUT_EDUCATION_QUERY
        }]
    })

    function Delete(){
        DeleteEducation()
    }
    
    return (
        <div>
            <Dialog onClose={handleClose} maxWidth={'100%'} open={props.open}>
                <DialogTitle >
                    Delete
                </DialogTitle>
                <DialogContent dividers>
                    <div style={{marginBottom: 15}}>
                        Are You Sure to Delete ?     
                    </div>         
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

export default DeleteEducationDialog