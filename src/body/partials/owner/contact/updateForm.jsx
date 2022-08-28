import React from 'react'
import {Input,FormHelperText,CardActions,FormControl,Grid,Button,TextField,makeStyles,Card,CardContent,InputLabel} from '@material-ui/core'
import { useForm } from '../../../../customHooks/hooks'
import { useMutation } from '@apollo/client'
import {UPDATE_SOCIAL_MEDIA_INFO } from '../../../../graphql/owner/contact'
import CircularProgress from '@material-ui/core/CircularProgress';

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

function UpdateSocialMediaInfo(props){
    const classes = useStyles()

    const { onChange, onSubmit, values } = useForm(Update, {
        id: props.data.id,
        phone: props.data.phone,
        mail: props.data.mail,
        location: props.data.location,
        instagram: props.data.instagram,
        whatsapp: props.data.whatsapp
    })

    const [UpdateSocialMediaInfo, { loading }] = useMutation(UPDATE_SOCIAL_MEDIA_INFO, {
        update(cache, result) {
            console.log(result)
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: values.id,
            phone: values.phone,
            mail: values.mail,
            location: values.location,
            instagram: values.instagram,
            whatsapp: values.whatsapp
        }
    })

    function Update(){
        UpdateSocialMediaInfo()
    }


    return (     
            <Card elevation={3} className={classes.card}>                
                <CardContent className={classes.cardContent}>                
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="whatsapp">Whatsapp</InputLabel>
                                <Input id="whatsapp" name="whatsapp" value={values.whatsapp} onChange={onChange}/>
                                <FormHelperText >Whatsapp Here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="location">Location</InputLabel>
                                <Input id="location" name="location" value={values.location} onChange={onChange}/>
                                <FormHelperText>Location here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <Input id="email" name="email" value={values.mail} onChange={onChange}/>
                                <FormHelperText>Email here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                                <Input id="phone" name="phone" value={values.phone} onChange={onChange}/>
                                <FormHelperText>Phone Number goes here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} className={classes.section}>                
                            <TextField id="instagram" className={classes.formControl} label='Instagram' color="secondary" name="instagram" value={values.instagram} onChange={onChange}/>
                            <FormHelperText>Input Your Instagram Here!</FormHelperText>                      
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.action}>
                    {
                        loading ? (<CircularProgress color="secondary"/>) : (
                            <Button variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={onSubmit}
                                >Update Info</Button>
                        )
                    }
                </CardActions>        
            </Card>      
    )
}

export default UpdateSocialMediaInfo