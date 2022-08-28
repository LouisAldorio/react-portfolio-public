import { useQuery } from '@apollo/client'
import React,{useContext, useEffect,useRef,useState} from 'react' 
import { FETCH_CONFIG_ABOUT_EDUCATION_QUERY, UPDATE_EDUCATION_BY_ID } from '../../../../../../../graphql/owner/about'
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
import EditEducation from './educationUpdate';
import AddEducation from './educationAdd'
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DrawerLayer from '../../../../drawerLayer'
import DeleteEducationDialog from './educationDelete';


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

function createData(id,name, start_year, end_year, address, category_name, on_duty,logo,image,link,education_category_id) {
    return {
        id,
        name,
        start_year, 
        end_year, 
        address, 
        category_name, 
        link,
        on_duty,
        education_category_id,
        logo,
        image
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
        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Education"} innerComponent={<EditEducation data={row}/>} />))}); 
        toggleDrawer(true)(event)       
    }

    const handleChange = (event) => {
        setState(event.target.checked);
    };

    const [deleteOpen,setDeleteOpen] = useState(false)
    const DeleteRow = () => {
        setDeleteOpen(true)
    }

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        Update()
    }, [state])

    const [UpdateEducationDuty, { loading }] = useMutation(UPDATE_EDUCATION_BY_ID, {
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
            name: row.name,
            link: row.link,
            logo: row.logo,
            image: row.image,
            start_year: row.start_year,
            end_year: row.end_year,
            education_category_id: row.education_category_id,
            address: row.address,
            on_duty: state ? 1 : 2
        }
    })

    function Update() {
        UpdateEducationDuty()
    }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.start_year}</TableCell>
        <TableCell align="right">{row.end_year}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.category_name}</TableCell>
        <TableCell align="right">{row.link}</TableCell>   
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        </TableCell>
      </TableRow>
      <DeleteEducationDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
    </React.Fragment>
  );
}

export default function EducationList() {
    const classes = useStyles()

    const {loading,data} = useQuery(FETCH_CONFIG_ABOUT_EDUCATION_QUERY)

    const rows = data && data.about.education_without_category.map((item,index) => {
        return createData(
            item.id,
            item.name,
            item.start_year,
            item.end_year,
            item.address,
            item.category.title,
            item.on_duty,
            item.logo,
            item.image,
            item.link,
            item.education_category_id)
    })

    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    return loading ? (<CircularProgress className={classes.loading} color="secondary"/>) : (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Start Year</TableCell>
                        <TableCell align="right">End Year</TableCell>
                        <TableCell align="right">Address</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Link</TableCell>
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

                    dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: (<DrawerLayer title={"Add Education"} innerComponent={<AddEducation/>} />)})
                    toggleDrawer(true)(e) 

                }}>Add Education</Button>
        </React.Fragment>
    );
}