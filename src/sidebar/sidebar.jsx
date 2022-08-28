import React from 'react';
import clsx from 'clsx';
import {Grow} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MediaCard from './partials/profileCard'
import {NavLink} from 'react-router-dom'
import './sidebar.css'
import { useScript } from '../customHooks/hooks';

var drawerWidth = window.innerWidth < 600 ? '100%' : 320;

const routes = [{
  name: 'Home',
  icon: <img src="https://fileserver.louisaldorio.site/portfolio/assets/house.png" width="30px" height="30px"/>,
  route: '/'
}, {
  name: 'About',
  icon: <img src="https://fileserver.louisaldorio.site/portfolio/assets/accurate.png" width="30px" height="30px"/>,
  route: '/about'
},{
  name: 'Profile',
  icon: <img src="https://fileserver.louisaldorio.site/portfolio/assets/profile (1).png" width="30px" height="30px"/>,
  route: '/profile'
}, {
  name: 'Gallery',
  icon: <img src="https://fileserver.louisaldorio.site/portfolio/assets/gallery (1).png" width="30px" height="30px"/>,
  route: '/gallery'
},{
  name: 'Contact Me',
  icon: <img src="https://fileserver.louisaldorio.site/portfolio/assets/message.png" width="30px" height="30px"/>,
  route: '/contact'
}]

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "normal"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: 400,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: 400,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  list: {
    marginTop: 10,
    position: "relative",
    display: "block"
  }
}));

function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();

  

  const handleClick = () => {
    
    if(window.innerWidth < 600){
      if(props.open){
        props.handleDrawer(false)
      }
      
    }
  }

  const data = {
    name: "Louis Aldorio Efendi",
    born_date: "2001",
    avatar: "https://fileserver.louisaldorio.site/portfolio/photo/IMG_5171-642600448.jpg"
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div>
          <IconButton onClick={props.handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>

        <MediaCard isOpen={props.open} data={data}/>

        <List className={classes.list}>
          {routes.map((item,index) => (
            <NavLink key={index} to={item.route} style={{ textDecoration: 'none',color: 'black' }} onClick={handleClick}>
              <ListItem button >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </NavLink>
            
          ))}
          </List>
        <Divider />
      </Drawer>
      
    </React.Fragment>
  );
}

export default  SideBar;