import { CardContent, CircularProgress, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container, Typography, Card, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { useState, useEffect } from 'react';
const axios = require('axios');

function App() {
  const [name, setName] = useState("")
  const [cleaners, setCleaners] = useState([])
  const [submitted, setSubmission] = useState(false)
  const [reminder, setReminder] = useState('no')
  const [notificationType, setNotificationType] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const { REACT_APP_BACKEND_URL } = process.env

  const handleReminder = (event) => {
    if (event.target.value === 'no') {
      setEmail("")
      setPhoneNumber("")
      setNotificationType('')
    }
    setReminder(event.target.value);
  };
  const handleNotification = (event) => {
    setEmail("")
    setPhoneNumber("")
    setNotificationType(event.target.value);
  };
  useEffect(() => {
    axios.get(REACT_APP_BACKEND_URL).then(res => {
      setCleaners(res.data)
    }
    )
  }, [submitted, REACT_APP_BACKEND_URL])
  const handleSubmit = (e) => {
    e.preventDefault()
    const person = {
      name,
      notificationType,
      email,
      phoneNumber
    }

    // Make a request for a user with a given ID
    axios.post(REACT_APP_BACKEND_URL, person)
      .then(function (response) {
        setSubmission(true)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <Container maxWidth="md">
      {submitted ?
        <Grid item xs={12}><Card raised><CardContent><Typography color={'primary'}>Thanks for signing up!</Typography></CardContent></Card></Grid>
        :
        <Grid container spacing={2}>

          <Grid item xs={12} >
            <Card raised >
              <CardContent>
                <Typography align="center" variant="h3" component="h2">
                  Morning Sun Ward
                </Typography>
                <Typography align="center" variant="h4" component="h2">
                  Church Cleaning
                </Typography>
                <Typography variant="h5" component="h2">
                  Please submit name to sign up.Thank you!
                </Typography>
                <Typography variant="h6" component="h2">
                  Date: 09/25/2021 (Sat.)
                </Typography>
                <Typography variant="h6" component="h2">
                  Time: 9:00am - 10:00am
                </Typography>
                <Typography variant="h6" component="h2">
                  Location: Gary church building (33794 N Gary Rd, Queen Creek, AZ 85242)
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card raised>
              <CardContent>
                <form onSubmit={handleSubmit} >
                  <Grid container>
                    <Grid item xs={12}>
                      <TextField value={name} onChange={(e) => { setName(e.target.value) }} id="outlined-basic" label="Name" variant="outlined" />
                    </Grid>
                    {/* what time would you prefer to come next time our ward is assigned to clean? */}
                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Would you like a reminder?</FormLabel>
                        <RadioGroup
                          aria-label="gender"
                          name="controlled-radio-buttons-group"
                          value={reminder}
                          onChange={handleReminder}
                        >
                          <FormControlLabel value='yes' control={<Radio />} label="Yes" />
                          <FormControlLabel value='no' control={<Radio />} label="No" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {reminder === 'yes' &&
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">How would you like to be reminded?</FormLabel>
                          <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={notificationType}
                            onChange={handleNotification}
                          >
                            <FormControlLabel value='email' control={<Radio />} label="Email" />
                            <FormControlLabel value='text' control={<Radio />} label="Text" />
                            <FormControlLabel value='call' control={<Radio />} label="Call" />
                          </RadioGroup>
                        </FormControl></Grid>}
                    {notificationType === "email" && <Grid item xs={12}><TextField value={email} onChange={(e) => { setEmail(e.target.value) }} id="outlined-basic" label="Email" variant="outlined" /></Grid>}
                    {notificationType === "call" && <Grid item xs={12}><TextField value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} id="outlined-basic" label="Phone Number" variant="outlined" /></Grid>}
                    {notificationType === "text" && <Grid item xs={12}><TextField value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} id="outlined-basic" label="Phone Number" variant="outlined" /></Grid>}
                    <Grid item xs={12}><Button color="primary" disabled={name && ((reminder === "yes" && (email || phoneNumber !== '')) || reminder === "no") ? false : true} onClick={handleSubmit} variant="contained">Submit</Button></Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card raised>
              <CardContent>
                <Typography>
                  See List of those who have signed up
                </Typography>
                {cleaners.length > 0 ? <List dense={true}>
                  {cleaners.map((each, index) => (
                    <ListItem key={index}>
                      <ListItemText>{each.name}</ListItemText>
                    </ListItem>
                  )
                  )}
                </List> : <CircularProgress />}

              </CardContent>
            </Card>
          </Grid>
        </Grid>}
    </Container >
  );
}

export default App;
