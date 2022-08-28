import { Button, makeStyles } from '@material-ui/core'
import React,{useContext} from 'react'
import {AuthContext} from '../../../../auth/auth'
import {Redirect} from 'react-router-dom'
import EducationConfig from './partials/education/education'
import WorkingExperienceConfig from './partials/workingExperience/workingExperience'
import BuiltProjectsConfig from './partials/builtProjects/builtProjects'
import EducationList from './partials/education/components/educationList'

const useStyles = makeStyles({
    root: {
        marginBottom: 20
    }
})


function AboutConfig(props){
    const {user} = useContext(AuthContext)
    const classes = useStyles()

    if(!user) {
        return (
            <Redirect to="/" />
        )
    }
    
    return (
        <div className={classes.root}>
            <EducationConfig />
            <WorkingExperienceConfig />
            <BuiltProjectsConfig />
        </div>       
    )
}

export default AboutConfig