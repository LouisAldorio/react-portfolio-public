import React,{useContext,useRef,useEffect,useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { DrawerTogglerContext } from '../../../../main';
import { DrawerContext } from '../../../../../reducer/drawerReducer';
import DrawerLayer from '../../drawerLayer'
import EditSkill from './skillUpdate';
import {  UPDATE_SKILL_BY_ID } from '../../../../../graphql/owner/profile';
import {useMutation} from '@apollo/client'
import {TableCell,TableRow,Link,TableContainer,Paper,Table,TableBody,Button,TableHead} from '@material-ui/core'
import CustomizedSwitches from '../../switch';
import AddIcon from '@material-ui/icons/Add';
import SkillAdd from './skillAdd';
import DeleteSkillDialog from './skillDelete';

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
  
function createData(id,name,logo,state,on_duty) {
    return {
        id,
        name,
        logo,
        state,
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
        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Skill"} innerComponent={<EditSkill data={row}/>} />))}); 
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

    const [UpdateSkill, { loading }] = useMutation(UPDATE_SKILL_BY_ID, {
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
            logo: row.logo,
            state: row.state,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateSkill()
    }

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    <img src={row.logo} alt="" width={"100px"}/>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.state}</TableCell> 
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
            <DeleteSkillDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id}/>
        </React.Fragment>
    )
}

function SkillList(props) {
    const classes = useStyles()

    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const [drawerState, dispatch] = useContext(DrawerContext);

    const rows = props.data && props.data.map((item,index) => {
        return createData(
            item.id,
            item.name,
            item.logo,
            item.state,
            item.on_duty
        )
    })

    return (
        <React.Fragment>
            <h1>Skills</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Logo</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">State</TableCell>
                            <TableCell align="left">On Duty</TableCell>
                            <TableCell align="left">Actions</TableCell>
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

                        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: (<DrawerLayer title={"Add New Skill"} innerComponent={<SkillAdd/>} />)})
                        toggleDrawer(true)(e) 

                }}>Add New Skill</Button>       
        </React.Fragment>
    )
}

export default SkillList