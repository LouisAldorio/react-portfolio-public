import React from 'react'
import {Card,Typography,CardContent,CardActions, makeStyles} from '@material-ui/core'
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles({
    pos: {
        marginBottom: 12,
    },
    ContactCard: {
        display: 'flex',
        flexWrap: "wrap"
    },
    socialIcon: {
        marginRight: 15
    }
})


function ContactCard(props){
    const classes = useStyles()

    return (
        <Card style={{backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',height: 550}} elevation={3}>
            <CardContent >
                <Typography variant="h5" component="h2">
                    Contact Information
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Louis Aldorio
                </Typography>
                <Typography variant="body1" component="p">
                    Fill Up The Form and Get In Touch With me!
                </Typography>
            </CardContent>
            
            <CardContent className={classes.ContactCard}>
                <CallOutlinedIcon className={classes.socialIcon}/>
                <Typography >
                    {props.data.phone}
                </Typography>
            </CardContent >
            <CardContent className={classes.ContactCard}>
                <MailOutlineOutlinedIcon className={classes.socialIcon}/>
                <Typography >
                    {props.data.mail}
                </Typography>
            </CardContent>
            <CardContent className={classes.ContactCard}>
                <LocationOnOutlinedIcon className={classes.socialIcon}/>
                <Typography >
                    {props.data.location}
                </Typography>
            </CardContent>
            <CardContent className={classes.ContactCard}>
                <WhatsAppIcon className={classes.socialIcon}/>
                <Typography >
                    {props.data.whatsapp}
                </Typography>
            </CardContent>
            <CardContent className={classes.ContactCard}>
                <InstagramIcon className={classes.socialIcon}/>
                <Typography >
                    {props.data.instagram}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default ContactCard