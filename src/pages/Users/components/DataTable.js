/** @format */

import React, {useState} from 'react'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

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
    minWidth: 120,
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
]

const styles = makeStyles(theme => ({
  container: {
    maxHeight: 440,
  },
}))

export default function DataTable({rows, onDelete}) {
  const classes = styles()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} style={{minWidth: column.minWidth}}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell key="" style={{minWidth: 20}}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
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
                  <TableCell hover role="checkbox" tabIndex={-1} key={`${index}_actionDelete`}>
                    <IconButton onClick={() => onDelete(row.username)}>
                      <FontAwesomeIcon icon={faTrash} key={`${index}-trash`} color="white" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
