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
    minWidth: 170,
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'E-mail',
    minWidth: 170,
  },
  {
    id: 'city',
    label: 'City',
    minWidth: 170,
  },
  {
    id: 'rig',
    label: 'Ride in Group',
    minWidth: 170,
  },
  {
    id: 'dotw',
    label: 'Day of the week',
    minWidth: 170,
  },
  {
    id: 'posts',
    label: 'Posts',
    minWidth: 170,
  },
  {
    id: 'albuns',
    label: 'Albuns',
    minWidth: 170,
  },
  {
    id: 'photos',
    label: 'Photos',
    minWidth: 170,
  },
]

function createData(username, name, email, city, rig, dotw, posts, albuns, photos) {
  return {username, name, email, city, rig, dotw, posts, albuns, photos}
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
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get.users
      .then(data => {
        console.log('data', data)
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
