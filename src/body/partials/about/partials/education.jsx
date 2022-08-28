import React,{useState} from 'react'
import {Grow,Accordion,Typography,AccordionSummary,AccordionDetails,makeStyles} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delayed from '../../../../utils/delay'
import EducationCard from './educationPartial/educationCard'
import SchoolIcon from '@material-ui/icons/School';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(22),
    //   flexBasis: '33.33%',
    //   flexShrink: 0,
      marginTop: 10,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(22),
      color: theme.palette.text.secondary,
    },
  }));

function EducationAccordion(props){
    const classes = useStyles();


    return (
        <Delayed waitBeforeShow={0 * 400}> 
            <Grow in={true} mountOnEnter unmountOnExit timeout={{enter: 1000,exit: 1000}}>
                <Accordion  className={classes.root}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        {/* <SchoolIcon style={{width: '50px',height: '100%',marginRight: 10}}/>  */}
                        <img src={props.data.logo} style={{width: '50px',height: '100%',marginRight: 10}} alt=""/>
                        <Typography className={classes.heading}> {props.data.title}</Typography>
                    </AccordionSummary>                  
                    {
                        props.data.nodes.map((item,index) => (
                            <AccordionDetails key={index}>
                                <EducationCard data={item} key={index}/>
                            </AccordionDetails>
                            
                        ))
                    }                                   
                </Accordion>
            </Grow>
        </Delayed>
    )
}

export default EducationAccordion