import React, { useContext } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom'
import './toolbar.css'
import { AuthContext } from '../auth/auth';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const configRoutes = [{
  name: 'Home',
  route: '/owner/config/home'
},{
  name: 'About',
  route: '/owner/config/about'
},{
  name: 'Profile',
  route: '/owner/config/profile'
}, {
  name: 'Gallery',
  route: '/owner/config/gallery'
},{
  name: 'Contact',
  route: '/owner/config/contact'
},{
  name: 'Setting',
  route: '/owner/config/setting',
}]

const useStyles = makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
      width: 30,
      height: 40,
      marginLeft:1,
    },
    toolbar: {
        backgroundColor: "#FFD300"
    },
    loginButton: {
      marginLeft: 'auto',
      display: 'flex'
    }
  }));

function MyToolbar(props){
    const classes = useStyles()

    const {user,logout} = useContext(AuthContext)

    return(
        <AppBar
            position="fixed"
            className={clsx(classes.appBar)}
        >
        <Toolbar className={'toolbar'}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawer}
            edge="start"
            className={clsx(classes.menuButton)}
          >
            <div id="nav-icon2" className={clsx({
              ['open']: props.open,
            })}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </IconButton>
          <Typography variant="h5" noWrap>
            Louis Aldorio Efendi
          </Typography>
          <div className={classes.loginButton}>
            {user && configRoutes.map((item,index) => (
              <NavLink key={index} to={item.route} style={{ textDecoration: 'none',color: 'black'}}>
                <ListItem button >
                  <ListItemText primary={item.name} />
                </ListItem>
              </NavLink>            
            ))}


            {user && <Button onClick={logout} >Log Out</Button>} 
            {!user && (
              <NavLink to={'/owner/login'} style={{ textDecoration: 'none',color: 'black' }} >
                <Button >Owner</Button>
              </NavLink>
            )}          
            
          </div>
          
        </Toolbar>
        
      </AppBar>
    )
}

export default MyToolbar;



    // const isGallery = () => {
    //   let currentLocation = window.location.href
    //   let arrStr = currentLocation.split("/")
    //   let endPoint = arrStr[arrStr.length - 1]
    //   if(endPoint == "gallery"){
    //     return true
    //   }else {
    //     return false
    //   }
    // }
    // isGallery()