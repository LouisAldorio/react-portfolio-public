import { makeStyles,TextField,FormControlLabel,Checkbox,Grid,Link,Button, Typography } from '@material-ui/core'
import React,{useContext} from 'react'
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { DrawerTogglerContext } from '../../main';


const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        justifyContent: "flex-end",
    },
}))
function DrawerLayer(props){
    const classes = useStyles()
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    return (
        <React.Fragment>
            <div className={classes.drawerHeader}>
                <Typography>{props.title}</Typography>
                <IconButton onClick={(event) => {
                    toggleDrawer(false)(event) 
                }}>
                    <CloseIcon />
                </IconButton>
            </div>
            {props.innerComponent}
        </React.Fragment>
    )
}

export default DrawerLayer