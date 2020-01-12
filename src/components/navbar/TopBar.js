/** @format */

import React, {useRef, useState} from 'react'
import {
  Avatar,
  Grid,
  Typography,
  Button,
  MenuList,
  MenuItem,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  Divider,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSquare, faChevronDown} from '@fortawesome/free-solid-svg-icons'

const styles = makeStyles(theme => ({
  container: {
    height: 120,
    padding: 30,
  },
  title: {
    fontWeight: 500,
  },
  logo: {
    paddingRight: 15,
  },
  button: {
    backgroundColor: '#FFF',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#FFF',
    },
  },
}))

export default function TopBar() {
  const classes = styles()

  const anchorRef = useRef(null)

  const [open, setOpen] = useState(false)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <Grid container alignItems="center" className={classes.container} justify="space-between">
      <Grid item container alignItems="center" xs={6}>
        <Grid item>
          <FontAwesomeIcon size="4x" color="#3ac5a9" icon={faSquare} className={classes.logo} />
        </Grid>
        <Grid item>
          <Typography className={classes.title} variant="h4">
            Venturus Sports
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={3} justify="flex-end">
        <Grid item>
          <Avatar>LF</Avatar>
        </Grid>
        <Grid item>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className={classes.button}
            endIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            Lucas Franzolin
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>Friends List</MenuItem>
                      <MenuItem onClick={handleClose}>Saved Items</MenuItem>
                      <MenuItem onClick={handleClose}>Notifications</MenuItem>
                      <MenuItem onClick={handleClose}>User Preferences</MenuItem>
                      <Divider />
                      <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Grid>
      </Grid>
    </Grid>
  )
}
