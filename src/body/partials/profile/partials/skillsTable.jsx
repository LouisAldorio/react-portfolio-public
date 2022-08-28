import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Rating from '@material-ui/lab/Rating';
import { Typography } from '@material-ui/core';
import {zoomingContext} from '../../../../App'

const columns = [
  { id: 'Tech', label: 'Tech', minWidth: window.innerWidth > 600 ? 170 : 120 },
  { id: 'Ratings', label: 'Ratings', minWidth: 100 ,align: 'center'},
];

function createData(Tech, Ratings) {
  return { Tech, Ratings };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  // eslint-disable-next-line
  const {isPhotoNotZoom, setIsPhotoNotZoom} = useContext(zoomingContext)

  const rows = props.data.map((item) => {
      return createData(
          <div>
            <img style={{marginLeft: window.innerWidth > 600 ? '45%' : '0%',height: '50px'}} src={item.logo}/> 
            <Typography variant="body1" color="textPrimary" align={window.innerWidth > 600 ? 'center' : ''}>{item.name}</Typography>
          </div>,<Rating name="read-only" value={item.state} precision={0.5} readOnly />)
  })

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead style={{display: isPhotoNotZoom === false ? 'none' : ''}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,textAlign: window.innerWidth > 600 ? 'center' : '' }}
                  >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column, index) => {
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
  );
}