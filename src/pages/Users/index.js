/** @format */

import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {faPuzzlePiece} from '@fortawesome/free-solid-svg-icons'
import {faTrophy} from '@fortawesome/free-solid-svg-icons'
import {faMapSigns} from '@fortawesome/free-solid-svg-icons'

import Headline from '../../components/common/Headline'

const styles = makeStyles(theme => ({}))

export default function Users() {
  const classes = styles()

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
      <Grid item>
        <span>bla</span>
      </Grid>
    </>
  )
}
