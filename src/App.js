/** @format */

import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Switch, Route, Redirect} from 'react-router-dom'
import routes from './routes'

import {Grid} from '@material-ui/core'

import Breadcrumb from './components/navbar/Breadcrumb'
import TopBar from './components/navbar/TopBar'

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}))

function App() {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Grid container direction="column" xs={12}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>
      </Grid>
      <Grid container xs={12}>
        <Switch>
          {routes.map(route => {
            return <Route exact key={route.component} path={route.path} component={route.component} />
          })}
          <Redirect from="/" exact to="/users" />
          <Redirect to="/notfound" />
        </Switch>
      </Grid>
    </div>
  )
}

export default App
