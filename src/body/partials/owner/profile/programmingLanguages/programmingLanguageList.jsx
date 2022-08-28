import React,{useContext,useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { DrawerTogglerContext } from '../../../../main';
import { DrawerContext } from '../../../../../reducer/drawerReducer';
import DrawerLayer from '../../drawerLayer'
import EditProgrammingLanguage from './programmingLanguageUpdate';
import { UPDATE_PROGRAMMING_LANGUAGE_BY_ID } from '../../../../../graphql/owner/profile';
import {useMutation} from '@apollo/client'
import {TableCell,TableRow,Link,TableContainer,Paper,Table,TableBody,Button,TableHead} from '@material-ui/core'
import CustomizedSwitches from '../../switch';
import AddIcon from '@material-ui/icons/Add';
import ProgrammingLanguageAdd from './programmingLanguageAdd';
import DeleteProgrammingLanguageDialog from './programmingLanguageDelete';

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
  
function createData(id,name,value,color,total,on_duty) {
    return {
        id,
        name,
        value,
        color,
        total,
        on_duty
    };
}

function Row(props){
    const {row} = props
    const classes = useRowStyles();
    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);
    const [state, setState] = React.useState(row.on_duty === 1 ? true : false);

    const EditRow = (event) => {
        event.preventDefault();  
        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Programming Language"} innerComponent={<EditProgrammingLanguage data={row}/>} />))}); 
        toggleDrawer(true)(event)       
    }

    const [deleteOpen,setDeleteOpen] = useState(false)
    const DeleteRow = () => {
        setDeleteOpen(true)
    }

    const handleChange = (event) => {
        setState(event.target.checked);
    };

    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        Update()
    }, [state])

    const [UpdateProgrammingLanguage, { loading }] = useMutation(UPDATE_PROGRAMMING_LANGUAGE_BY_ID, {
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
            color: row.color,
            value: row.value,
            total: row.total,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateProgrammingLanguage()
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">
                    <div style={{backgroundColor: row.color,width: 100, height: 100}}>

                    </div>
                </TableCell>
                <TableCell align="right">{row.total}</TableCell> 
                <TableCell align="right">
                    <CustomizedSwitches state={state} handleChange={handleChange}/>
                </TableCell> 
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
            <DeleteProgrammingLanguageDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
        </React.Fragment>
    )
}

function ProgrammingLanguageList(props) {
    const classes = useStyles()

    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    const rows = props.data && props.data.map((item,index) => {
        return createData(
            item.id,
            item.name,
            item.value,
            item.color,
            item.total,
            item.on_duty
        )
    })

    return (
        <React.Fragment>
            <h1>Programming Languages</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Value Scale</TableCell>
                            <TableCell align="left">Color</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="left">On Duty</TableCell>
                            <TableCell align="left">Actions</TableCell>
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

                        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: (<DrawerLayer title={"Add Programming Language"} innerComponent={<ProgrammingLanguageAdd/>} />)})
                        toggleDrawer(true)(e) 

                }}>Add Programming Language</Button>       
        </React.Fragment>
    )
}

export default ProgrammingLanguageList