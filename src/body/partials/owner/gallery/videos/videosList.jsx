import React,{useRef,useEffect, useContext,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomizedSwitches from '../../switch';
import {Link} from '@material-ui/core'
import { UPDATE_VIDEO_BY_ID } from '../../../../../graphql/owner/gallery';
import {useMutation} from '@apollo/client'
import { DrawerContext } from '../../../../../reducer/drawerReducer';
import { DrawerTogglerContext } from '../../../../main';
import DrawerLayer from '../../drawerLayer';
import EditVideo from './videosUpdate';
import DeleteVideoDialog from './videosDelete'

const columns = [
    { id: 'id', label: 'ID', minWidth: 50},
    { id: 'src', label: 'Video', minWidth: 250 },  
    { id: 'on_duty', label: 'On Duty', minWidth: 70},
    { id: 'action', label: 'Action', minWidth: 100}
];

const useStyles = makeStyles({
    root: {
        width: '97%',
    },
    container: {
        maxHeight: 600,
    },
});

function Rows(props){
    const {row} = props

    const [deleteOpen,setDeleteOpen] = useState(false)

    const [state, setState] = React.useState(row.on_duty == 1 ? true : false);
    const handleChange = (event) => {
        setState(event.target.checked);
    };

    const [drawerState, dispatch] = useContext(DrawerContext);
    const {toggleDrawer} = useContext(DrawerTogglerContext)
    const EditRow = (event) => {
        event.preventDefault();  

        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Video"} innerComponent={
            <EditVideo data={row} />
        } />))}); 

        toggleDrawer(true)(event)       
    }

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

    const [UpdateVideo, { loading }] = useMutation(UPDATE_VIDEO_BY_ID, {
        update(cache, result) {

        },
        onError(err) {
            if(err) {
                console.log(err)
            }
        },
        variables: {
            id: row.id,
            src: row.src,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateVideo()
    }

    return (
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                    const value = row[column.id];

                    {
                        if(column.id === "on_duty"){
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <CustomizedSwitches state={state} handleChange={handleChange}/>
                                </TableCell>
                            )
                        }else if(column.id === "action"){
                            return (
                                <TableCell key={column.id} align={column.align}>
                                    <div style={{display: 'flex'}}>
                                        <Link component="button" onClick={EditRow}  style={{marginRight: 5}}>
                                            Edit
                                        </Link> | 
                                        <Link component="button" onClick={DeleteRow} style={{marginLeft: 5}}>
                                            Delete
                                        </Link>
                                    </div>
                                </TableCell>
                            )
                        }
                    }

                    return (
                        <TableCell key={column.id} align={column.align}>
                            {column.id == "src" ? (
                                <iframe width={column.minWidth} height="240" 
                                    title={value}
                                    src={value} 
                                    frameBorder="0"
                                    allowfullScreen="allowFullScreen"></iframe> 
                                ) : (column.format && typeof value === 'number' ? column.format(value) : value)}
                        </TableCell>
                    );
                })}
            </TableRow>
            <DeleteVideoDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id} src={row.src}/>
        </React.Fragment>
    )
}

export default function VideosList(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead  style={{display: props.isPhotoNotZoom === false ? 'none' : ''}}>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.data.map((row,index) => {
                        return (
                            <Rows row={row} key={index}/>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}