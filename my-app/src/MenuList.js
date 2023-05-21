import * as React from 'react';
// import './MenuList.css';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function MenuListComposition() {
  // Define state variables using the useState hook
  const [open, setOpen] = React.useState(false); // Whether the menu is open or closed
  const anchorRef = React.useRef(null); // A reference to the button that opens the menu

  // Event handler for toggling the menu open and closed
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Event handler for closing the menu when the user clicks outside of it
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // Event handler for handling keyboard input when the menu is open
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // Return focus to the button when the menu is closed
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // Render the component
  return (
    <Stack direction="row" spacing={2}>
      {/* Render a paper container for the menu list */}
      <Paper className="menu-container">
        <MenuList>
          {/* Render menu items inside the menu list */}
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
      {/* Render a button to open the menu list */}
      <div>
        <Button className = 'dashboard-button'
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Metroplex 360 Dashboard
        </Button>
        {/* Render the menu list using the Popper component */}
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {/* Render the menu items inside the Popper component */}
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                {/* Handle clicks outside of the menu list using ClickAwayListener */}
                <ClickAwayListener onClickAway={handleClose}>
                  {/* Render the actual menu list */}
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
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