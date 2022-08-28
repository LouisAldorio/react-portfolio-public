import {Grid, Grow,makeStyles,Typography } from '@material-ui/core'
import {useQuery} from '@apollo/client'
import FETCH_ABOUT_PAGE_QUERY from '../../../graphql/about'
import React, { useEffect, useState } from 'react'
import WorkingExperiencedCard from './partials/workingExperienceCard'
import Footer from '../../../footer/footer'
import Delayed from '../../../utils/delay'
import ProjectCard from './partials/projectCard'
import EducationAccordion from './partials/education'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import MediumArticleCard from './partials/medium'

const useStyles = makeStyles({
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
})

function About() {
    const classes = useStyles()
    const [apiData, setApiData] = useState()

    const {loading,data} = useQuery(FETCH_ABOUT_PAGE_QUERY,{
        variables: {
            status: [1],
            nodeStatus: [1]
        }
    })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_MEDIUM_ARTICLE_ENDPOINT}`)
        .then(res => {
            setApiData(res.data)
        })
    },[])

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
            <React.Fragment>
                <Grid container spacing={2} style={{padding: 24}}>  
                    <Delayed waitBeforeShow={0 * 400}>        
                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                            <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button="true">
                                <Typography variant="h4" style={{margin: 25}}>{"Education"}</Typography>

                                <Grid container spacing={2}>
                                    {data && data.about.education.map((item,index) => (
                                        <Delayed waitBeforeShow={index * 300} key={index}>
                                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                                <Grid xs={12} sm={12} md={6} button="true">
                                                    <EducationAccordion data={item} />
                                                </Grid>
                                            </Grow>
                                        </Delayed>
                                    ))}
                                </Grid>
                            </Grid> 
                        </Grow>              
                    </Delayed>

                    <Delayed waitBeforeShow={1 * 400}>        
                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                            <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button>
                                <Typography variant="h4" style={{margin: 25}}>{"Working Experience"}</Typography>

                                <Grid container spacing={2}>
                                    {data && data.about.working_experience.map((item,index) => (
                                        <Delayed waitBeforeShow={index * 300}>
                                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                                <Grid xs={12} sm={12} md={6} lg={'auto'} button>
                                                    <WorkingExperiencedCard data={item}/> 
                                                </Grid>
                                            </Grow>
                                        </Delayed>
                                    ))}
                                </Grid>
                            </Grid> 
                        </Grow>              
                    </Delayed>

                    <Delayed waitBeforeShow={2 * 400}>        
                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                            <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button>
                                <Typography variant="h4" style={{margin: 25}}>{"Built Projects"}</Typography>

                                <Grid container spacing={2}>
                                    {data && data.about.built_projects.map((item,index) => (
                                        <Delayed waitBeforeShow={index * 300}>
                                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                                <Grid xs={12} sm={12} md={6} lg={'auto'} button>
                                                    <ProjectCard data={item}/>
                                                </Grid>
                                            </Grow>
                                        </Delayed>
                                    ))}
                                </Grid>
                            </Grid> 
                        </Grow>              
                    </Delayed>       

                    <Delayed waitBeforeShow={3 * 400}>        
                        <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                            <Grid xs={12} sm={12} md={12} style={{textAlign: "left"}} button>
                                <Typography variant="h4" style={{margin: 25}}>{"Medium Articles"}</Typography>

                                <Grid container spacing={2}>
                                    {apiData && apiData.items.map((item,index) => (
                                        <Delayed waitBeforeShow={index * 300}>
                                            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                                                <Grid xs={12} sm={12} md={6} lg={'auto'} button>
                                                    <MediumArticleCard data={item} author={apiData && apiData.feed}/>
                                                </Grid>
                                            </Grow>
                                        </Delayed>
                                    ))}
                                </Grid>
                            </Grid> 
                        </Grow>              
                    </Delayed>                  
                </Grid>
                <Footer />       
            </React.Fragment>
        )}


export default About