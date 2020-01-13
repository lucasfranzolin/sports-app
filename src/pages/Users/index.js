/** @format */

import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  Grid,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {faTrophy} from '@fortawesome/free-solid-svg-icons'
import {faMapSigns} from '@fortawesome/free-solid-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import Headline from '../../components/common/Headline'
import DataTable from './components/DataTable'
import api from '../../api'

function createData(username, name, email, city, rig, dotw, posts, albuns, photos) {
  return {username, name, email, city, rig, dotw, posts, albuns, photos}
}

function createRows(users, photos, posts, albuns, rideInGroup, dayOfTheWeek) {
  let postsCounter = {}
  posts.map(post => {
    if (!(post.userId in postsCounter)) {
      return (postsCounter[post.userId] = 1)
    } else {
      return (postsCounter[post.userId] += 1)
    }
  })

  let usersRideOption = {}
  rideInGroup.map(rideOption => {
    return (usersRideOption[rideOption.userId] = rideOption.rideInGroup)
  })

  let usersDaysOfTheWeek = {}
  dayOfTheWeek.map(daysOption => {
    return (usersDaysOfTheWeek[daysOption.userId] = daysOption.daysOfTheWeek)
  })

  let usersAlbuns = {}
  albuns.map(album => {
    if (!(album.userId in usersAlbuns)) {
      return (usersAlbuns[album.userId] = 1)
    } else {
      return (usersAlbuns[album.userId] += 1)
    }
  })

  let usersPhotos = {}
  albuns.map(album => {
    if (!(album.userId in usersPhotos)) {
      return (usersPhotos[album.userId] = album.photos.length)
    } else {
      return (usersPhotos[album.userId] += album.photos.length)
    }
  })

  let rows = []
  users.map(user => {
    return rows.push(
      createData(
        user.username,
        user.name,
        user.email,
        user.address.city,
        usersRideOption[user.id],
        usersDaysOfTheWeek[user.id],
        postsCounter[user.id],
        usersAlbuns[user.id],
        usersPhotos[user.id],
      ),
    )
  })

  return rows
}

const styles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    maxWidth: '85%',
  },
  title: {
    minHeight: 150,
  },
}))

export default function Users() {
  const classes = styles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const banners = [
    {
      icon: faPuzzlePiece,
      primaryText: 'Sport type',
      secondaryText: 'Cycling',
    },
    {
      icon: faTrophy,
      primaryText: 'Mode',
      secondaryText: 'Advanced',
    },
    {
      icon: faMapSigns,
      primaryText: 'Route',
      secondaryText: '30 miles',
    },
  ]

  const [open, setOpen] = React.useState(false)
  const [userToDel, setUserToDel] = useState(null)
  const [users, setUsers] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (search === '') {
      setFiltered(users)
    } else {
      let filteredUsers = users.filter(
        row => row.username.toLowerCase().includes(search) | row.name.toLowerCase().includes(search),
      )
      setFiltered(filteredUsers)
    }
  }, [search, setFiltered, users])

  const getUsers = () => {
    const promise0 = api.get.users
    const promise1 = api.get.photos
    const promise2 = api.get.posts
    const promise3 = api.get.albuns
    const promise4 = api.get.rideInGroup
    const promise5 = api.get.dayOfTheWeek

    Promise.all([promise0, promise1, promise2, promise3, promise4, promise5])
      .then(results => {
        const users = results[0]
        const photos = results[1]
        const posts = results[2]
        const albuns = results[3]
        const rideInGroup = results[4]
        const dayOfTheWeek = results[5]
        const rows = createRows(users, photos, posts, albuns, rideInGroup, dayOfTheWeek)
        console.log('users', rows)
        setUsers(rows)
        setFiltered(rows)
      })
      .catch(err => console.error(err))
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAgree = () => {
    const newUsers = users.filter(user => user.username !== userToDel)
    setUsers(newUsers)
    setOpen(false)
  }

  const onInputChange = e => {
    setSearch(e.target.value)
  }

  const handleOnDelete = username => {
    setUserToDel(username)
    setOpen(true)
  }

  return (
    <>
      <Headline banners={banners} />
      <Grid container justify="center" alignItems="baseline">
        <Grid item container className={classes.content}>
          <Grid item container className={classes.title}>
            <Grid item container alignItems="center" xs={2}>
              <Typography variant="h3">Users</Typography>
            </Grid>
            <Grid item container direction="column" justify="center" alignItems="stretch" xs={6}>
              <Divider />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item container alignItems="center" xs={3}>
              <TextField
                id="outlined-basic"
                label="Filter table content"
                variant="outlined"
                className={classes.input}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon color="#808080" icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <DataTable rows={filtered} onDelete={handleOnDelete} />
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
              <DialogTitle id="responsive-dialog-title">{'Confirmation'}</DialogTitle>
              <DialogContent>
                <DialogContentText>Do you really want to delete {userToDel}?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAgree} color="primary" autoFocus>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
