/** @format */

import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Grid, Typography} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const styles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: '#baebe1',
    padding: 40,
  },
  primary: {
    fontWeight: 600,
    color: 'gray',
  },
  secondary: {
    fontWeight: 'bold',
    color: '#3c3c3c',
  },
}))

export default function Headline({banners}) {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {banners.map(banner => {
          return (
            <Grid item container spacing={2} xs={3}>
              <Grid item>
                <FontAwesomeIcon size="4x" color="#3ac5a9" icon={banner.icon} />
              </Grid>
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle1" className={classes.primary}>
                      {banner.primaryText}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" className={classes.secondary}>
                      {banner.secondaryText}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
