import React,{createContext, useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {  Route } from "react-router-dom";
import Home from './partials/home/home'
import Galleries from './partials/gallery/gallery'
import './main.css';
import Contact from './partials/contact/contact';
import About from './partials/about/about';
import Profile from './partials/profile/profile'
import { Container } from 'react-bootstrap'
import { CSSTransition } from 'react-transition-group'
import LoginPage from './partials/owner/login';
import AboutConfig from './partials/owner/about/about'
import ProfileConfig from './partials/owner/profile/profile';
import GalleryConfig from './partials/owner/gallery/gallery';
import ContactConfig from './partials/owner/contact/contact';
import Drawer from '@material-ui/core/Drawer';
import { Button } from '@material-ui/core';
import { DrawerContext } from '../reducer/drawerReducer'
import SiteConfiguration from './partials/owner/setting/setting';
import HomeConfig from './partials/owner/home/home';

const useStyles = makeStyles((theme) => ({
	toolbar: {
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }, 
    main: {
        
    }
}))

const routes = [
    { path: '/', name: 'Home', Component: Home},
    { path: '/about', name: 'About', Component: About},
    { path: '/contact', name: 'Contact', Component: Contact},
    { path: '/profile', name: 'Profile', Component: Profile},
    { path: '/gallery', name: 'Gallery', Component: Galleries},
    { path: '/owner/login', name: 'Login', Component: LoginPage},
    { path: '/owner/config/about', name: 'Config About', Component: AboutConfig},
    { path: '/owner/config/profile', name: 'Config Profile', Component: ProfileConfig},
    { path: '/owner/config/gallery', name: 'Config Gallery', Component: GalleryConfig},
    { path: '/owner/config/contact', name: 'Config Contact', Component: ContactConfig},
    { path: '/owner/config/setting', name: 'Config Setting' , Component: SiteConfiguration},
    { path: '/owner/config/home', name: 'Config Home', Component: HomeConfig }
]

function Main(){

    const classes = useStyles();

    const [drawerState, dispatch] = useContext(DrawerContext);

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (open) => (event) => { 
        setState({ ...state, right: open });
    };

    return (
        <DrawerTogglerContext.Provider value={{toggleDrawer}}>
            <main className={'main'}>
                <div className={classes.toolbar} />
                <Container className="container">
                    {routes.map(({ path, Component }) => (
                        <Route key={path} exact path={path} component={Component}>
                            {({ match }) => (
                                <CSSTransition
                                    in={match != null}
                                    timeout={500}
                                    classNames="page"
                                    unmountOnExit
                                >
                                    <div className="page">
                                        <Component />
                                    </div>
                                </CSSTransition>
                            )}
                        </Route>
                    ))}
                </Container>
                <Drawer  anchor={'right'} open={state.right} onClose={toggleDrawer(false)} >
                    {drawerState.component}
                </Drawer>
            </main>
        </DrawerTogglerContext.Provider>
        
    )
}

export const DrawerTogglerContext = createContext()
export default Main