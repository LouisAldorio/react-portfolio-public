import React from 'react'
import ProgrammingLanguageChart from './partials/programmingLanguageChart';
import { Grid, Grow,Typography,makeStyles } from '@material-ui/core'
import Footer from '../../../footer/footer'
import Delayed from '../../../utils/delay'
import StickyHeadTable from './partials/skillsTable';
import {useQuery} from '@apollo/client'
import FETCH_PROFILE_PAGE_QUERY from '../../../graphql/profile'
import CircularProgress from '@material-ui/core/CircularProgress';
import LinkedInBadge from './partials/linkedIn';

const useStyles = makeStyles({
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
})

function Profile() {

    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_PROFILE_PAGE_QUERY,{
        variables:{
            status: [1]
        }
    })

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <Grid container spacing={2} style={{padding: 24}}>                             
                <Delayed waitBeforeShow={0 * 400}>        
                    <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                        <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button item>

                            <LinkedInBadge />
              
                            <Typography variant="h4" style={{margin: 25}}>{"Programming Languages"}</Typography>

                            <Grid container spacing={2}>
                                
                                {data && data.profile.programming_languages.map((item,index) => (
                                    <Delayed waitBeforeShow={(index + 1) * 300} key={index}>
                                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                            <Grid xs={12} item={true} sm={12} md={3} button>
                                                <ProgrammingLanguageChart data={item}/>
                                            </Grid>
                                         </Grow>
                                     </Delayed>
                                ))}
                            </Grid>
                        </Grid> 
                    </Grow>              
                </Delayed>

                {data && (
                    <Delayed waitBeforeShow={1 * 400}>        
                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                            <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button item>
                                <Typography variant="h4" style={{margin: 25}}>{"Skills"}</Typography>

                                <Grid container spacing={2}>
                                    <Grid xs={12} sm={12} md={6} button item>
                                        <StickyHeadTable data={window.innerWidth > 600 ? data.profile.skills.slice(0,data.profile.skills.length / 2 + 1) : data.profile.skills } key={1}/>
                                    </Grid>
                                    {window.innerWidth > 600 && <Grid xs={12} sm={12} md={6} button item>
                                        <StickyHeadTable data={data.profile.skills.slice(data.profile.skills.length / 2 + 1)} key={2}/>
                                    </Grid>}                             
                                </Grid>
                            </Grid> 
                        </Grow>              
                    </Delayed> 
                )}                                   
            </Grid>
            <Footer />       
        </React.Fragment>
    )
    
}

export default Profile;