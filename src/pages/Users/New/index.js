/** @format */

import React, {useState} from 'react'
import {
  Grid,
  Typography,
  Divider,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {faUserFriends} from '@fortawesome/free-solid-svg-icons'
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import {faWallet} from '@fortawesome/free-solid-svg-icons'
import {faLifeRing} from '@fortawesome/free-solid-svg-icons'
import {faHeartbeat} from '@fortawesome/free-solid-svg-icons'
import {faSmile} from '@fortawesome/free-solid-svg-icons'

import Headline from '../../../components/common/Headline'
import Tip from './components/Tip'

const styles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    maxWidth: '85%',
  },
  title: {
    minHeight: 150,
  },
  form: {
    marginTop: 80,
  },
  margin: {
    marginBottom: 30,
    width: '25vw',
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#1abc9c',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#1abc9c',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#1abc9c',
    },
  },
  btnSave: {
    color: 'white',
    backgroundColor: '#1abc9c',
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

  const tips = [
    {
      icon: faLifeRing,
      primaryText: 'Need help?',
      secondaryText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      icon: faHeartbeat,
      primaryText: 'Why register?',
      secondaryText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      icon: faSmile,
      primaryText: 'What people are saying...',
      secondaryText:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ]

  const initalText = ''
  const initalRig = 'always'
  const initialCheck = {
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  }
  const [texts, setTexts] = useState({
    username: initalText,
    name: initalText,
    email: initalText,
    city: initalText,
  })
  const [rig, setRig] = useState(initalRig)
  const [check, setCheck] = useState(initialCheck)

  const handleTextChange = e => {
    setTexts({...texts, [e.target.name]: e.target.value})
  }

  const handleRadioChange = e => {
    setRig(e.target.value)
  }

  const handleCheckboxChange = name => e => {
    setCheck({...check, [name]: e.target.checked})
  }

  const handleSave = () => {
    const {username, name, email, city} = texts

    let checks = 0
    for (let key in check) {
      if (key) checks++
    }

    if (username !== '' && name !== '' && email !== '' && city !== '' && checks > 0) {
      localStorage.setItem(username, [
        username,
        name,
        email,
        city,
        rig,
        check.mon,
        check.tue,
        check.wed,
        check.thu,
        check.fri,
        check.sat,
        check.sun,
      ])
      alert(`${username} saved with success!`)
    } else {
      alert('Make sure to fill in all fields.')
    }
  }

  const handleCancel = () => {
    setTexts({
      username: initalText,
      name: initalText,
      email: initalText,
      city: initalText,
    })
    setRig(initalRig)
    setCheck(initialCheck)
  }

  const {mon, tue, wed, thu, fri, sat, sun} = check

  return (
    <>
      <Headline banners={banners} />
      <Grid container justify="center" alignItems="baseline" style={{marginBottom: 80}}>
        <Grid item container className={classes.content}>
          <Grid item container className={classes.title}>
            <Grid item container alignItems="center" xs={3}>
              <Typography variant="h3">Registration</Typography>
            </Grid>
            <Grid item container direction="column" justify="center" alignItems="stretch" xs={9}>
              <Divider />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Tip tips={tips} />
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            xs={12}
            className={classes.form}>
            <Divider />
          </Grid>
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="baseline"
            xs={12}
            className={classes.form}>
            <Grid item direction="column" xs={6}>
              <Grid item>
                <Typography variant="h5"> Username</Typography>
                <TextField
                  name="username"
                  helperText="Choose your username"
                  value={texts.username}
                  onChange={handleTextChange}
                  className={classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
              </Grid>
              <Grid item>
                <Typography variant="h5"> Name</Typography>
                <TextField
                  name="name"
                  helperText="Choose your name"
                  value={texts.name}
                  onChange={handleTextChange}
                  className={classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
              </Grid>
              <Grid item>
                <Typography variant="h5"> E-mail</Typography>
                <TextField
                  name="email"
                  helperText="Choose your e-mail"
                  value={texts.email}
                  onChange={handleTextChange}
                  className={classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
              </Grid>
              <Grid item container direction="row" spacing={2}>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleSave} className={classes.btnSave}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleCancel}>Discard</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid item>
                <Typography variant="h5"> City</Typography>
                <TextField
                  name="city"
                  helperText="Choose your city"
                  value={texts.city}
                  onChange={handleTextChange}
                  className={classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  id="custom-css-outlined-input"
                />
              </Grid>
              <Grid item>
                <FormControl component="fieldset">
                  <Typography variant="h5">Ride in group?</Typography>
                  <RadioGroup aria-label="position" name="position" value={rig} onChange={handleRadioChange} row>
                    <FormControlLabel
                      value="always"
                      control={<Radio color="primary" />}
                      label="Always"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="sometimes"
                      control={<Radio color="primary" />}
                      label="Sometimes"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="never"
                      control={<Radio color="primary" />}
                      label="Never"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item style={{marginTop: 20}}>
                <FormControl component="fieldset">
                  <Typography variant="h5">Days of the week</Typography>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox checked={mon} onChange={handleCheckboxChange('mon')} value="mon" />}
                      label="Mon"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={tue} onChange={handleCheckboxChange('tue')} value="tue" />}
                      label="Tue"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={wed} onChange={handleCheckboxChange('wed')} value="wed" />}
                      label="Wed"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={thu} onChange={handleCheckboxChange('thu')} value="thu" />}
                      label="Thu"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={fri} onChange={handleCheckboxChange('fri')} value="fri" />}
                      label="Fri"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={sat} onChange={handleCheckboxChange('sat')} value="sat" />}
                      label="Sat"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={sun} onChange={handleCheckboxChange('sun')} value="sun" />}
                      label="Sun"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
