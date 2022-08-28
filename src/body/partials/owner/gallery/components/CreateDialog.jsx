import React from 'react';
import Dialog from '@material-ui/core/Dialog';

export default function CustomizedDialogs(props) {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div >
      <Dialog onClose={handleClose} maxWidth={'100%'} open={props.open}>
        {props.payload}
      </Dialog>
    </div>
  );
}