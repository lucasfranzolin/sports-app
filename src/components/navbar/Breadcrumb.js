/** @format */

import React from 'react'
import {Breadcrumbs, Link} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

const styles = makeStyles(theme => ({
  container: {
    height: 50,
    paddingLeft: 20,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
  },
}))

export default function Breadcrumb() {
  const classes = styles()

  function firstLetterToUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const url = window.location.pathname

  const pathArr = url.split('/')
  pathArr.shift()

  let paths = [
    {
      label: firstLetterToUpperCase(pathArr[0]),
      link: pathArr[0],
    },
  ]
  let i = 1
  while (pathArr[i] != null) {
    let link = `${paths[i - 1].link}/${pathArr[i]}`
    paths.push({
      label: firstLetterToUpperCase(pathArr[i]),
      link: link,
    })
    i++
  }
  console.log('paths', paths)

  return (
    <div className={classes.container}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          <FontAwesomeIcon color="#3ac5a9" icon={faHome} />
        </Link>
        {paths.map(path => {
          return (
            <Link color="inherit" href={`/${path.link}`}>
              {path.label}
            </Link>
          )
        })}
      </Breadcrumbs>
    </div>
  )
}
