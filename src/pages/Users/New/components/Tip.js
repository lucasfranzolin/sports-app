/** @format */

import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: 10,
  },
  primary: {
    fontSize: 30,
    color: '#1abc9c',
  },
  secondary: {
    paddingLeft: 20,
  },
}))

export default function Tip({tips}) {
  const classes = styles()
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
        {tips.map((tip, index) => {
          return (
            <Grid item container xs={4} key={`${tip.primaryText}_${tip.secondaryText}_${index}`}>
              <Grid item>
                <Typography variant="subtitle1" className={classes.primary}>
                  {tip.primaryText}
                </Typography>
              </Grid>
              <Grid item container>
                <Grid item xs={2}>
                  <FontAwesomeIcon size="4x" color="#3ac5a9" icon={tip.icon} />
                </Grid>
                <Grid item xs={10} className={classes.secondary}>
                  {tip.secondaryText}
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
