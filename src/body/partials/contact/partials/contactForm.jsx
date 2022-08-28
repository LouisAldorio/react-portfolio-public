import React from 'react'
import {CardContent,Icon,Card,CardActions,Button,makeStyles,InputLabel,Input,FormHelperText,Grid, TextField} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import {CREATE_NEW_MESSAGE_AND_SUBSCRIBE} from '../../../../graphql/contact'
import { useMutation } from '@apollo/client';
import { useForm } from '../../../../customHooks/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
        height: '100%'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardContent: {
        padding: 24
    },
    formControl: {
        width: '95%',
    },
    action: {
        position: 'relative',
        height: '100%'
    },
    button: {
        margin: theme.spacing(1),
        position: 'absolute',
        top: window.innerWidth > 600 ? '3%' : '-5%',
        right: window.innerWidth > 600 ? 30 : 15,
    },
    section: {
        marginBottom: 50
    }
}))

function ContactForm(){
    const classes = useStyles()

    const { onChange, onSubmit, values } = useForm(Create, {
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        message: ''
    })

    const [CreateMessageAndSubscribe, { loading }] = useMutation(CREATE_NEW_MESSAGE_AND_SUBSCRIBE, {
        update(cache, result) {
            values.email = ''
            values.first_name = ''
            values.last_name = ''
            values.phone_number = ''
            values.message = ''
            onResponseNotification("success",result.data.contact.mail)()
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            email: values.email,
            first_name: values.first_name,
            last_name: values.last_name,
            phone_number: values.phone_number,
            message: values.message
        }
    })

    function Create(){
        CreateMessageAndSubscribe()
    }

    const { enqueueSnackbar } = useSnackbar()
    const onResponseNotification = (variant,response) => () => {
        enqueueSnackbar(`${response}, Thanks for contacting me, Stay Tuned for my reply soon!`, { variant });
    };

    return (
        <Card elevation={3} className={classes.card}>
            <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                    <Grid xs={12} sm={12} md={6} className={classes.section}>
                        <FormControl className={classes.formControl} color="secondary">
                            <InputLabel htmlFor="first_name">First Name</InputLabel>
                            <Input id="first_name" name="first_name" onChange={onChange} value={values.first_name}/>
                            <FormHelperText >Your First Name!</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} className={classes.section}>
                        <FormControl className={classes.formControl} color="secondary">
                            <InputLabel htmlFor="last_name">Last Name</InputLabel>
                            <Input id="last_name" name="last_name" onChange={onChange} value={values.last_name}/>
                            <FormHelperText >Your Last Name!</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} className={classes.section}>
                        <FormControl className={classes.formControl} color="secondary">
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input id="email" name="email" onChange={onChange} value={values.email}/>
                            <FormHelperText >Subscribe to be notified about Updates!</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={6} className={classes.section}>
                        <FormControl className={classes.formControl} color="secondary">
                            <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                            <Input id="phone_number" name="phone_number" onChange={onChange} value={values.phone_number}/>
                            <FormHelperText >Phone Number goes here!</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid xs={12} sm={12} md={12} className={classes.section}>                
                        <TextField id="message" 
                            className={classes.formControl} 
                            multiline 
                            label='Message' rows="5" color="secondary" onChange={onChange} name="message" value={values.message}/>
                        <FormHelperText id="message">Input Your Message Here!</FormHelperText>                      
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.action}>
                <Button variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={onSubmit}
                        endIcon={loading ? <CircularProgress color="secondary"/> : <SendIcon/>}>Send Message</Button>
            </CardActions>
        </Card>
    )
}

export default ContactForm