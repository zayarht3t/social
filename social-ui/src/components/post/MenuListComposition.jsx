import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { MoreVert } from "@material-ui/icons";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Confirm from './Confirm';


export default function MenuListComposition({user,post}) {
  const {currentUser} = useSelector((state)=>state);
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleDelete = () =>{
    <Confirm />
      
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <MoreVert/>
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {
                      currentUser._id == user._id ? 
                        (
                          <div>
                            <MenuItem onClick={handleClose}><p style={{"fontSize": "13px"}}> <EditIcon style={{"fontSize": "14px"}}/> Edit</p></MenuItem>
                            {/* <EditIcon style={{"fontSize": "14px"}}/> */}
                            <MenuItem onClick={()=>handleDelete()}><p style={{"fontSize": "11px","display": "flex","alignItems": "center"}}><DeleteIcon style={{"fontSize": "13px","marginRight":"3px"}}/><Confirm post={post}/> </p></MenuItem>
                          </div>
                        )
                      : <MenuItem onClick={handleClose}><p style={{"fontSize": "13px"}}><BookmarkIcon style={{"fontSize": "13px"}}/> Save post</p></MenuItem>
                      
                    }
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}