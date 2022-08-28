import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import {DialogActions,Button,DialogTitle,DialogContent} from '@material-ui/core'
import {  DELETE_SKILL_BY_ID, FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS } from '../../../../../graphql/owner/profile';
import { useMutation } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';

function DeleteSkillDialog(props){
    
    const handleClose = () => {
        props.setOpen(false);
    };

    const [DeleteSkill, { loading }] = useMutation(DELETE_SKILL_BY_ID, {
        update(proxy, result) {
            const CurrentData = proxy.readQuery({query: FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS})
            proxy.writeQuery({
                query: FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS,
                data: {
                    profile: {
                        skills: CurrentData.profile.skills.filter(id => id !== result.data.profile.skill.delete.id)
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
        DeleteSkill()
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

export default DeleteSkillDialog