/** @format */

import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'

import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {faTrophy} from '@fortawesome/free-solid-svg-icons'
import {faMapSigns} from '@fortawesome/free-solid-svg-icons'

import Headline from '../../components/common/Headline'
import api from '../../api'

const columns = [
  {
    id: 'username',
    label: 'Username',
    minWidth: 100,
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
  },
  {
    id: 'email',
    label: 'E-mail',
    minWidth: 100,
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 100,
  },
  {
    id: 'rig',
    label: 'Ride in Group',
    minWidth: 100,
  },
  {
    id: 'dotw',
    label: 'Day of the week',
    minWidth: 100,
  },
  {
    id: 'posts',
    label: 'Posts',
    minWidth: 100,
  },
  {
    id: 'albuns',
    label: 'Albuns',
    minWidth: 100,
  },
  {
    id: 'photos',
    label: 'Photos',
    minWidth: 100,
  },
  {
    id: 'actionDelete',
    label: '',
    minWidth: 50,
  },
]

function createData(username, name, email, city, rig, dotw, posts, albuns, photos, btnDel) {
  return {username, name, email, city, rig, dotw, posts, albuns, photos, btnDel}
}

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
}))

export default function Users() {
  const classes = styles()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [users, setUsers] = useState([
    createData('username', 'name', 'email', 'city', 'rig', 'dotw', 'posts', 'albuns', 'photos'),
    createData('username1', 'name1', 'email1', 'city1', 'rig1', 'dotw1', 'posts1', 'albuns1', 'photos1'),
    createData('username2', 'name2', 'email2', 'city2', 'rig2', 'dotw2', 'posts2', 'albuns2', 'photos2'),
    createData('username3', 'name3', 'email3', 'city3', 'rig3', 'dotw3', 'posts3', 'albuns3', 'photos3'),
  ])

  useEffect(() => {
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
      })
      .catch(err => console.error(err))
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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

  return (
    <>
      <Headline banners={banners} />
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <div className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map(column => {
                          const value = row[column.id]
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </Grid>
      </Grid>
    </>
  )
}
