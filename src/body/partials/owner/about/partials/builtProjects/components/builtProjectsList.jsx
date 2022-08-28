import { useQuery } from '@apollo/client'
import React,{useContext, useEffect, useRef,useState} from 'react' 
import { FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY, UPDATE_BUILT_PROJECTS_BY_ID } from '../../../../../../../graphql/owner/about'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useMutation} from '@apollo/client'
import Paper from '@material-ui/core/Paper';
import CustomizedSwitches from '../../../../switch';
import Link from '@material-ui/core/Link';
import { DrawerTogglerContext } from '../../../../../../main';
import { DrawerContext } from '../../../../../../../reducer/drawerReducer';
import EditBuiltProjects from './builtProjectsUpdate';
import AddBuiltProjects from './builtProjectsAdd'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DrawerLayer from '../../../../drawerLayer'
import DeleteBuiltProjectDialog from './builtProjectDelete';


const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
    loading: {
        marginLeft: '47%'
    }
})

function createData(id,thumbnail,name,overview,github_link,deployment_link,on_duty) {
    return {
        id,
        thumbnail,
        name,
        overview,
        github_link,
        deployment_link,
        on_duty
    };
}

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    const [state, setState] = React.useState(row.on_duty === 1 ? true : false);
    const handleChange = (event) => {
        setState(event.target.checked);
    };

    const EditRow = (event) => {
        event.preventDefault();  
        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Built Projects"} innerComponent={<EditBuiltProjects data={row}/>} />))}); 
        toggleDrawer(true)(event)       
    }

    const [deleteOpen,setDeleteOpen] = useState(false)
    const DeleteRow = () => {
        setDeleteOpen(true)
    }
    
    const firstRender = useRef(true)

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        Update()
    }, [state])

    const [UpdateBuiltProjectsDuty, { loading }] = useMutation(UPDATE_BUILT_PROJECTS_BY_ID, {
        update(cache, result) {},
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: row.id,
            thumbnail: row.thumbnail,
            name: row.name,
            github_link: row.github_link,
            deployment_link: row.deployment_link,
            overview: row.overview,
            on_duty: state ? 1 : 2
        }
    })

    function Update() {
        UpdateBuiltProjectsDuty()
    }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
            <img src={row.thumbnail} alt="" width={"200px"}/>
        </TableCell>
        <TableCell align="right">{row.name}</TableCell>
        <TableCell align="right">{row.overview}</TableCell>
        <TableCell align="right">{row.github_link}</TableCell>
        <TableCell align="right">{row.deployment_link}</TableCell>
        <TableCell align="right"><CustomizedSwitches state={state} handleChange={handleChange}/></TableCell> 
        <TableCell align="right" >
            <div style={{display: 'flex'}}>
                <Link component="button" onClick={EditRow} style={{marginRight: 5}}>
                    Edit
                </Link> | 
                <Link component="button" onClick={DeleteRow} style={{marginLeft: 5}}>
                    Delete
                </Link>
            </div>          
        </TableCell>     
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
        </TableCell>
      </TableRow>
      <DeleteBuiltProjectDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
    </React.Fragment>
  );
}

export default function BuiltProjectList() {
    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_CONFIG_ABOUT_BUILT_PROJECTS_QUERY)

    const rows = data && data.about.built_projects.map((item,index) => {
        return createData(
            item.id,
            item.thumbnail,
            item.name,
            item.overview,
            item.github_link,
            item.deployment_link,
            item.on_duty)
    })

    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Thumbnail</TableCell>
                            <TableCell align="right">Project Name</TableCell>
                            <TableCell align="right">Overview</TableCell>
                            <TableCell align="right">Github Link</TableCell>
                            <TableCell align="right">Deployment Link</TableCell>
                            <TableCell align="right">On Duty</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained" color="secondary" startIcon={<AddIcon />} style={{marginTop: 15}} onClick={(e) => {

                    dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: (<DrawerLayer title={"Add Built Projects"} innerComponent={<AddBuiltProjects />} />)})
                    toggleDrawer(true)(e) 

                }}>Add Built rojects</Button>
        </React.Fragment>
    );
}