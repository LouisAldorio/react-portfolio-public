import React from 'react'
import {Card, Grid, makeStyles, Typography, Grow} from '@material-ui/core'
import Footer from '../../../footer/footer'
import ContactCard from './partials/contactCard'
import ContactForm from './partials/contactForm'
import Delayed from '../../../utils/delay'
import {useQuery} from '@apollo/client'
import {FETCH_SOCIAL_MEDIA_INFO} from '../../../graphql/contact'
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: 20,
        marginTop: 20
    },
    contactForm: {
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        width: window.innerWidth > 600 ? '80%' : '100%'
    },
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
})

function Contact() {
    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_SOCIAL_MEDIA_INFO)

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <Grid className={classes.header}>
                    <Typography  color="textPrimary" variant="h4">
                        Contact Me
                    </Typography>
                    <Typography  color="textSecondary" variant="h6">
                        Any questions or remarks? Just write me a message!
                    </Typography>
                </Grid>
            </Grow>
            
            <Grow in={true} mountOnEnter timeout={{enter: 1000,exit: 1000}}>
                <Card className={classes.contactForm}>
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
                                    <ContactForm />
                                </Grid>
                            </Grow>
                        </Delayed>
                    </Grid>
                </Card>
            </Grow>
            
            <Footer/>
        </React.Fragment>
    )
}

export default Contact;