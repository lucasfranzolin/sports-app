/** @format */

import React from 'react'
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {faWallet} from '@fortawesome/free-solid-svg-icons'

import Headline from '../../../components/common/Headline'

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

export default function UsersNew() {
  const classes = styles()

  const banners = [
    {
      icon: faUserFriends,
      primaryText: 'Be part of the',
      secondaryText: 'Team',
    },
    {
      icon: faUserPlus,
      primaryText: 'Join us',
      secondaryText: 'Today!',
    },
    {
      icon: faWallet,
      primaryText: "It'll be forever",
      secondaryText: 'FREE!',
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
