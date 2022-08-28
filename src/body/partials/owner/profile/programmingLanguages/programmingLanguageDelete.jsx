import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogActions,Button,DialogTitle,DialogContent} from '@material-ui/core'
import {  DELETE_PROGRAMMING_LANGUAGE_BY_ID, FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS } from '../../../../../graphql/owner/profile';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

function DeleteProgrammingLanguageDialog(props){
    
    const handleClose = () => {
        props.setOpen(false);
    };

    const [DeleteProgrammingLanguage, { loading }] = useMutation(DELETE_PROGRAMMING_LANGUAGE_BY_ID, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS})
            proxy.writeQuery({
                query: FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS,
                data: {
                    profile: {
                        programming_languages: CurrentData.profile.programming_languages.filter(id => id !== result.data.profile.programming_language.delete.id)
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
        DeleteProgrammingLanguage()
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

export default DeleteProgrammingLanguageDialog