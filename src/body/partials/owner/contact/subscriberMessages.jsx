import React from 'react'
import {makeStyles,Paper,Table,TableContainer,TableRow,TableCell,TableHead,TableBody} from '@material-ui/core'
import { useQuery } from '@apollo/client';
import { GET_SUBSCRIBER_MESSAGE } from '../../../../graphql/owner/contact';


const columns = [
    { id: 'id', label: 'ID', minWidth: 50},
    { id: 'first_name', label: 'First Name', minWidth: 100 }, 
    { id: 'last_name', label: 'Last Name', minWidth: 100},
    { id: 'email', label: 'Email', minWidth: 100},
    { id: 'phone_number', label: 'Phone Number', minWidth: 70},
    { id: 'message', label: 'Message', minWidth: 150},
];

const useStyles = makeStyles({
    root: {
        width: '97%',
        margin: 20
    },
    container: {
        maxHeight: 600,
    },
});

function createData(id,message,subscriber) {
    return { 
        id: id,
        message: message,
        first_name: subscriber.first_name,
        last_name: subscriber.last_name,
        email: subscriber.email,
        phone_number: subscriber.phone_number
    };
}

function MessagesList(){
    const classes = useStyles()

    const {loading,data} = useQuery(GET_SUBSCRIBER_MESSAGE)

    const rows = data && data.contact.messages.map((item,index) => createData(item.id,item.message,item.subscriber))

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead >
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
                    {rows && rows.map((row,index) => {
                        return (
                            <TableRow key={index} hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column,index) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={index} align={column.align}>
                                            {column.format && typeof value === 'number' ? column.format(value) : value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default MessagesList