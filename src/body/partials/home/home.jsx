import React, { useState } from 'react'
import { Button, Grid, makeStyles, Slide, Typography,Grow} from '@material-ui/core' 
import './home.css'
import Footer from '../../../footer/footer'
import GitHubIcon from '@material-ui/icons/GitHub';
import Typer from '../../../utils/typer';
import { useQuery } from '@apollo/client';
import { GET_HOME_INFO } from '../../../graphql/home';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useScript } from '../../../customHooks/hooks';

const useStyles = makeStyles({
    leftSide: {
        padding: 5,
        display: 'flex',
        height: window.innerWidth > 600 ? '73vh' : '',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button: {
        backgroundImage: 'linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)',
        width: '40%',
        height: '10%',
        marginTop: 30
    },
    loading: {
        marginLeft: '47%',
        marginTop: '22%'
    },
})

function Home() {
    const classes = useStyles()
    const [In,setIn] = useState(false)

    

    const {loading,data} = useQuery(GET_HOME_INFO)

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <Grid container spacing={2} style={{paddingTop: 70}}>
                <Slide direction="right" in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}} onEntered={() => {
                    setIn(true)
                }}>
                    <Grid xs={12} sm={12} md={6} className={classes.leftSide} button item>
                        <Typography variant="h5">
                            <Typer text={data && data.home.get_info.profession}/>
                        </Typography>
                        <Typography variant={window.innerWidth > 600 ? "h2" : "h4"} style={{ fontWeight: 800 ,marginTop: 40}}>
                            {data && data.home.get_info.title}

                            
                            <div className="badge-base LI-profile-badge" 
                                data-locale="en_US" data-size="medium" 
                                data-theme="light" data-type="HORIZONTAL" 
                                data-vanity="louis-aldorio-3518851a6" data-version="v1">           
                            </div>
                        </Typography>

                        <Typography style={{marginTop: 40}}>
                            {data && data.home.get_info.description}

                            
                        </Typography>
                        {
                            In === false && <Button 
                            href="https://github.com/LouisAldorio"
                            startIcon={<GitHubIcon />} 
                            variant="contained"
                            style={{visibility: 'hidden',marginTop: 30}}>Github</Button>
                        }


                        <Grow in={In}  mountOnEnter unmountOnExit timeout={{enter: 500,exit: 1000}}>
                            <Button href="https://github.com/LouisAldorio" startIcon={<GitHubIcon />} variant="contained" className={classes.button}>Github</Button>
                        </Grow>
                    </Grid> 
                </Slide>
                
                <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                    <Grid xs={12} sm={12} md={6} style={{textAlign: "center"}} button item>
                        <img src={data && data.home.get_info.logo} style={{width: '100%'}}/>
                        {/* <img src={"https://i.pinimg.com/originals/c3/a6/cb/c3a6cbbc1e1d5fed032ea0a49bb9f545.gif"} style={{width: '100%'}}/> */}
                    </Grid>
                </Slide>
            </Grid>
            <Footer />
        </React.Fragment>
    )
}
  



export default Home;