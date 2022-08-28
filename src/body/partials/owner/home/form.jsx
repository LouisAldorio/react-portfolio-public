import React,{useState} from 'react'
import {Input,FormHelperText,CardActions,FormControl,Grid,Button,TextField,makeStyles,Card,CardContent,InputLabel} from '@material-ui/core'
import { useForm } from '../../../../customHooks/hooks'
import { useMutation, useQuery } from '@apollo/client'
import {UPDATE_SOCIAL_MEDIA_INFO } from '../../../../graphql/owner/contact'
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../uploadComponent'
import { GET_HOME_INFO } from '../../../../graphql/home'
import { UPDATE_HOME_INFO } from '../../../../graphql/owner/home'

const useStyles = makeStyles((theme) => ({
    card: {
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
        height: '85vh',
        width: '70vw'
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
        right: window.innerWidth > 600 ? 50 : 15,
    },
    section: {
        marginBottom: 50
    },
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
}))

function HomeFromConfig(props){
    const classes = useStyles()
    const { data } = props

    const [image,setImage] = useState()
    const [imageSrc,setImageSrc] = useState(data.home.get_info.logo)

    

    const { onChange, onSubmit, values } = useForm(Update, {
        id: data.home.get_info.id,
        title: data.home.get_info.title,
        profession: data.home.get_info.profession,
        description: data.home.get_info.description,
        logo: imageSrc
    })

    const [UpdateHomeInfo, { loading : UpdateLoading }] = useMutation(UPDATE_HOME_INFO, {
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
            title: values.title,
            profession: values.profession,
            description: values.description,
            logo: values.logo
        }
    })

    function Update(){
        UpdateHomeInfo()
    }

    return  (     
            <Card elevation={3} className={classes.card}>                
                <CardContent className={classes.cardContent}>                
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="profession">Profession</InputLabel>
                                <Input id="profession" name="profession" value={values.profession} onChange={onChange}/>
                                <FormHelperText >Profession Here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} className={classes.section}>
                            <FormControl className={classes.formControl} color="secondary">
                                <InputLabel htmlFor="title">Title</InputLabel>
                                <Input id="title" name="title" value={values.title} onChange={onChange}/>
                                <FormHelperText>Title here!</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={12} md={12} className={classes.section}>                
                            <TextField id="description" 
                                className={classes.formControl} 
                                label='Description' 
                                color="secondary" 
                                name="description" 
                                value={values.description} 
                                onChange={onChange}
                                multiline rows={5}/>
                            <FormHelperText>Input Your Description Here!</FormHelperText>                      
                        </Grid>              
                        <div>
                            <Uploader 
                                buttonName={"Upload Image"} 
                                src={imageSrc} 
                                fileHandler={setImage}
                                handler={setImageSrc}
                                file={image && image}
                                fileName={image && image.name}/>
                        </div>                   
                    </Grid>
                </CardContent>
                <CardActions className={classes.action}>
                    {
                        UpdateLoading ? (<CircularProgress color="secondary"/>) : (
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

export default HomeFromConfig