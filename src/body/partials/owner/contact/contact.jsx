import { Button, makeStyles,Grow,Card,Grid } from '@material-ui/core'
import React,{useContext,useState} from 'react'
import {AuthContext} from '../../../../auth/auth'
import {Redirect} from 'react-router-dom'
import {useQuery} from '@apollo/client' 
import {FETCH_SOCIAL_MEDIA_INFO} from '../../../../graphql/contact'
import ContactCard from '../../contact/partials/contactCard'
import CircularProgress from '@material-ui/core/CircularProgress';
import Delayed from '../../../../utils/delay'
import UpdateSocialMediaInfo from './updateForm'
import MessagesList from './subscriberMessages'


const useStyles = makeStyles({
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
    updateForm: {
        marginRight: 'auto',
        padding: 10,
        width: window.innerWidth > 600 ? '80%' : '100%'
    },
})

function ContactConfig(props){
    const classes = useStyles()
    const {user} = useContext(AuthContext)

    const {loading,data} = useQuery(FETCH_SOCIAL_MEDIA_INFO)
    const [In,setIn] = useState(false)

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }
 
    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <h1>Contact</h1> 

            <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}} onEntered={() => {
                setIn(true)
            }}>
                <Card className={classes.updateForm}>
                    <Grid container spacing={2} >
                        <Delayed waitBeforeShow={400}>
                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                <Grid xs={12} sm={12} md={4} style={{padding: 10}}>                        
                                    <ContactCard data={data && data.contact.social_media_info}/>                             
                                </Grid>
                            </Grow>
                        </Delayed>
                        <Delayed waitBeforeShow={600}>
                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                <Grid xs={12} sm={12} md={8} style={{padding: 10}}>
                                    <UpdateSocialMediaInfo data={data && data.contact.social_media_info}/>
                                </Grid>
                            </Grow>
                        </Delayed>
                    </Grid>
                </Card>
            </Grow>     

            <Grow in={In} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <MessagesList />
            </Grow>           
        </React.Fragment>
    )
}

export default ContactConfig