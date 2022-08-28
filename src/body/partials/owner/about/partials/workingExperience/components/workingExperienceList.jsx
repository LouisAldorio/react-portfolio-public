import { useQuery } from '@apollo/client'
import React,{useContext, useEffect, useRef,useState} from 'react' 
import { FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY, UPDATE_WORKING_EXPERIENCE_BY_ID } from '../../../../../../../graphql/owner/about'
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
import EditWorkingExperience from './workingExperienceUpdate';
import AddWorkingExperience from './workingExperienceAdd'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DrawerLayer from '../../../../drawerLayer'
import DeleteWorkingExperienceDialog from './workingExperienceDelete';


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

function createData(id,company_logo,company_name, start_date, end_date, address, image,position,overview,description,on_duty) {
    return {
        id,
        company_logo,
        company_name,
        start_date, 
        end_date, 
        address, 
        image,
        position,
        overview,
        description,
        on_duty
    };
}

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    const [state, setState] = React.useState(row.on_duty === 1 ? true : false);

    const EditRow = (event) => {
        event.preventDefault();  
        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Working Experience"} innerComponent={<EditWorkingExperience data={row}/>} />))}); 
        toggleDrawer(true)(event)       
    }

    const handleChange = (event) => {
        setState(event.target.checked);
    };

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

    const [UpdateWorkingExperienceDuty, { loading }] = useMutation(UPDATE_WORKING_EXPERIENCE_BY_ID, {
        update(cache, result) {
            console.log(result)
        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: row.id,
            company_name: row.company_name,
            start_date: row.start_date,
            end_date: row.end_date,
            company_logo: row.company_logo,
            image: row.image,
            address: row.address,
            position: row.position,
            overview: row.overview,
            description: row.description,
            on_duty: state ? 1 : 2
        }
    })

    function Update() {
        UpdateWorkingExperienceDuty()
    }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">{row.company_name}</TableCell>
        <TableCell align="right">{row.start_date}</TableCell>
        <TableCell align="right">{row.end_date}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.position}</TableCell>
        <TableCell align="right">{row.overview}</TableCell>   
        <TableCell align="right">{row.description}</TableCell> 
        <TableCell align="right"><CustomizedSwitches state={state} handleChange={handleChange}/></TableCell> 
        <TableCell align="right">
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
      <DeleteWorkingExperienceDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
    </React.Fragment>
  );
}

export default function WorkingExpirienceList() {
    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_CONFIG_ABOUT_WORKING_EXPERIENCE_QUERY)

    const rows = data && data.about.working_experience.map((item,index) => {
        return createData(
            item.id,
            item.company_logo,
            item.company_name,
            item.start_date,
            item.end_date,
            item.address,
            item.image,
            item.position,
            item.overview,
            item.description,
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
                            <TableCell>Company Name</TableCell>
                            <TableCell align="right">Start Date</TableCell>
                            <TableCell align="right">End Date</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Position</TableCell>
                            <TableCell align="right">Overview</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">On Duty</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                variant="contained" color="secondary" startIcon={<AddIcon />} style={{marginTop: 15}} onClick={(e) => {

                    dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: (<DrawerLayer title={"Add Working Experience"} innerComponent={<AddWorkingExperience />} />)})
                    toggleDrawer(true)(e) 

                }}>Add Working Experience</Button>
        </React.Fragment>
    );
}