import './App.css';
import SideBar from './sidebar/sidebar';
import React, {useState, createContext} from 'react'
import { makeStyles,createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Main from './body/main';
import Particles from 'react-particles-js';
import particlesConfig from './particles/DNAParticleConfig';
import { BrowserRouter, withRouter } from 'react-router-dom';
import Toolbar from './toolbar/toolbar';
import { SnackbarProvider } from 'notistack';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'
import {setContext} from 'apollo-link-context'
import { AuthProvider } from './auth/auth';
import DrawerProvider from './reducer/drawerReducer'
import shinyParticlesConfig from './particles/ShinyParticleConfig';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		position: 'relative',
		height: '100%'
	},
}))

const theme = createMuiTheme({
	typography: {
		fontFamily: [
			'Nunito',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif'
		].join(','),
	},
	palette: {
		secondary: {
		  main: '#808080',
		},
	  },
  });

const zoomingContext = createContext()

const httpLink = createHttpLink({
	uri: `${process.env.REACT_APP_API_ENDPOINT}`,
})
  
  
  //look for token if exist and set to be authorization header
const authLink = setContext(() => {
	const token = localStorage.getItem('jwtToken')
		return {
			headers: {
				Authorization: token ? `${token}` : ''
		}
	}
})
  
  
const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})


function App() {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);

	const handleDrawer = () => {
		setOpen(!open);
	};

	const [isPhotoNotZoom, setIsPhotoNotZoom] = useState(true)

	return (
		<ApolloProvider client={client}>
			<AuthProvider client={client}>
				<DrawerProvider>
					<ThemeProvider theme={theme}>
						<SnackbarProvider maxSnack={3}>		
							<zoomingContext.Provider value={{isPhotoNotZoom, setIsPhotoNotZoom}}>
								<div className={classes.root}>
									<div style={{ position: 'fixed'}}>
										<Particles height="100vh" width="100vw" params={shinyParticlesConfig} />
									</div>
									
									<BrowserRouter>
										{isPhotoNotZoom && (
											<Toolbar handleDrawer={handleDrawer} open={open}/>
										)}

										<div style={{display: isPhotoNotZoom ? 'initial' : 'none'}}>
											<SideBar handleDrawer={handleDrawer} open={open} drawerHandler={handleDrawer}/>
										</div>
										<Main/>
									</BrowserRouter>
								</div> 
							</zoomingContext.Provider>
						</SnackbarProvider>	
					</ThemeProvider>
				</DrawerProvider>
			</AuthProvider>
		</ApolloProvider>		
	);
}

export {App,zoomingContext};
