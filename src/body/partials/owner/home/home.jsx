import React,{useContext, useState} from 'react'
import {Input,FormHelperText,CardActions,FormControl,Grid,Button,TextField,makeStyles,Card,CardContent,InputLabel} from '@material-ui/core'
import { useForm } from '../../../../customHooks/hooks'
import { useMutation, useQuery } from '@apollo/client'
import {UPDATE_SOCIAL_MEDIA_INFO } from '../../../../graphql/owner/contact'
import CircularProgress from '@material-ui/core/CircularProgress';
import Uploader from '../uploadComponent'
import { GET_HOME_INFO } from '../../../../graphql/home'
import { UPDATE_HOME_INFO } from '../../../../graphql/owner/home'
import HomeFromConfig from './form'
import { AuthContext } from '../../../../auth/auth'
import { Redirect } from 'react-router'

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

function HomeConfig(props){
    const classes = useStyles()
    const {loading,data} = useQuery(GET_HOME_INFO)


    const {user} = useContext(AuthContext)

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }



    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (     
        <HomeFromConfig data={data && data}/>
    )
}

export default HomeConfig