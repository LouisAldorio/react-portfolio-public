import { Button, makeStyles } from '@material-ui/core'
import React,{useContext, useEffect, useRef,useState} from 'react'
import {AuthContext} from '../../../../auth/auth'
import {Redirect} from 'react-router-dom'
import ProgrammingLanguageList from './programmingLanguages/programmingLanguageList'
import SkillList from './skills/skillList'
import {  useQuery } from '@apollo/client'
import { FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS } from '../../../../graphql/owner/profile'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        marginBottom: 20
    },
    loading: {
        marginLeft: '47%'
    }
})

function ProfileConfig(props){
    const classes = useStyles()
    const {user} = useContext(AuthContext)
    const {loading,data} = useQuery(FETCH_CONFIG_PROFILE_PROGRAMMING_LANGUAGES_AND_SKILLS)

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <div className={classes.root}>
            <ProgrammingLanguageList data={data && data.profile.programming_languages}/>
            <SkillList data={data && data.profile.skills}/>
        </div>
        
    )
}

export default ProfileConfig