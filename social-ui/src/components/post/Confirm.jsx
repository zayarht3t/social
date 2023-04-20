import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { render } from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Provider } from "react-redux";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function Confirm({post}) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async()=>{
    try {
        const response = await axios.delete(`http://localhost:8000/api/posts/delete/${post._id}`,{
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true
        });
        
        
        console.log(response.data)
        handleClose();
        
    } catch (error) {
        console.log(error)
    }
    
  }

  return (
    <div>
      <p variant="" onClick={handleClickOpen}>
        <p style={{"fontSize": "13px"}}>Delete</p>
      </p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleDelete()}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}