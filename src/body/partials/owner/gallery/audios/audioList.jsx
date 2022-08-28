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
import {useMutation} from '@apollo/client'
import {UPDATE_AUDIO_BY_ID} from '../../../../../graphql/owner/gallery' 
import EditAudio from './audioUpdate';
import DrawerLayer from '../../drawerLayer';
import { DrawerContext } from '../../../../../reducer/drawerReducer';
import { DrawerTogglerContext } from '../../../../main';
import DeleteAudioDialog from './audioDelete';

const columns = [
    { id: 'id', label: 'ID', minWidth: 50},
    { id: 'cover', label: 'Cover', minWidth: 170 }, 
    { id: 'title', label: 'Title', minWidth: 150},
    { id: 'src', label: 'Audio', minWidth: 100},
    { id: 'author', label: 'Author', minWidth: 150},
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

    const [drawerState, dispatch] = useContext(DrawerContext);
    const {toggleDrawer} = useContext(DrawerTogglerContext)

    const [state, setState] = React.useState(row.on_duty == 1 ? true : false);
    const handleChange = (event) => {
        setState(event.target.checked);
    };
    const audioRef = useRef()

    const EditRow = (event) => {
        event.preventDefault();  

        dispatch({type: 'SET_CURRENT_DRAWER_VIEW', payload: ((<DrawerLayer title={"Edit Audio"} innerComponent={
            <EditAudio data={row} refHandler={audioRef}/>
        } />))}); 

        toggleDrawer(true)(event)       
    }

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

    const [UpdateAudio, { loading }] = useMutation(UPDATE_AUDIO_BY_ID, {
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
            cover: row.cover,
            title: row.title,
            author: row.author,
            src: row.src,
            on_duty: state ? 1 : 2
        }
    })

    function Update(){
        UpdateAudio()
    }

    return (
        <React.Fragment>
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                    const value = column.id === "category" ? row.category.category : row[column.id];

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
                                        <Link component="button" onClick={EditRow} style={{marginRight: 5}}>
                                            Edit
                                        </Link> | 
                                        <Link component="button" onClick={DeleteRow} style={{marginLeft: 5}}>
                                            Delete
                                        </Link>
                                    </div>
                                </TableCell>
                            )
                        }else if(column.id === "src"){
                        return (
                            <TableCell key={column.id} align={column.align}>
                            <audio controls width={column.minWidth} ref={audioRef}>
                                <source src={value} type="audio/mpeg"/>
                                Your browser does not support the audio tag.
                            </audio>
                            </TableCell>
                        )                      
                        }
                    }

                    return (
                        <TableCell key={column.id} align={column.align}>
                            {column.id == "cover" ? (
                                <img src={value} onClick={() => {
                                    props.setCurrentPhotoGroup(props.data)
                                    props.openLightbox(props.index)
                                    
                                }} width={column.minWidth}/>
                            ) : (column.format && typeof value === 'number' ? column.format(value) : value)}
                        </TableCell>
                    );
                })}
            </TableRow>
            <DeleteAudioDialog open={deleteOpen} setOpen={setDeleteOpen} id={row.id} src={row.src}/>
        </React.Fragment>
    )
}

export default function AudioList(props) {
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
                        <Rows row={row} 
                            openLightbox={props.openLightbox} 
                            index={index} 
                            setCurrentPhotoGroup={props.setCurrentPhotoGroup}
                            data={props.data}/>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
}