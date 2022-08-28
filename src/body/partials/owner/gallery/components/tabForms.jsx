import React from 'react' 
import Typography from '@material-ui/core/Typography';
import {DialogTitle,DialogContent,DialogActions,Button} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TopImagesAdd from '../topImages/topImageAdd';
import ImagesAdd from '../images/imagesAdd';
import AudioAdd from '../audios/audioAdd';
import VideoAdd from '../videos/videosAdd';



function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanelForms(props) {
    let { value, index,component } = props;
  
    return (  
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-auto-tabpanel-${index}`}
          aria-labelledby={`scrollable-auto-tab-${index}`}
        >
          {value === index && (
            component
          )}
        </div>  
    );
}

function TabsForms(props){

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue); 
    };
    const tabs =[
        {
            name: "Create Top Image",
            Component: <TopImagesAdd closeForm={props.handleClose}/>,
        },
        {
            name: "Create Image",
            Component: <ImagesAdd closeForm={props.handleClose} imagesCategory={props.imagesCategory}/>
        },
        {
            name: "Create Audio",
            Component: <AudioAdd closeForm={props.handleClose}/>
        },
        {
            name: "Create Video",
            Component: <VideoAdd closeForm={props.handleClose}/>
        }
    ]

    return (
        <React.Fragment>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabs.map((item,index) => (
                        <Tab label={item.name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </AppBar>
            <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose(false)}>
                {tabs[value].name}
            </DialogTitle>
            <DialogContent dividers>
                {tabs.map((item,index) => (
                    <TabPanelForms value={value} index={index} component={item.Component} />
                ))}
                
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.handleClose(false)} color="primary">
                    Close
                </Button>
            </DialogActions>
        </React.Fragment>
    )
}

export default TabsForms