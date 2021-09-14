import './App.css';
import { Container, Typography, Card, TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { useState, useEffect } from 'react';
const axios = require('axios');

function App() {
  const [name, setName] = useState("")
  const [cleaners, setCleaners] = useState([])
  const [submitted, setSubmission] = useState(false)
  const { REACT_APP_BACKEND_URL } = process.env
  useEffect(() => {
    axios.get(REACT_APP_BACKEND_URL).then(res => {
      setCleaners(res.data)
    }
    )
  }, [REACT_APP_BACKEND_URL, submitted]) //run on mount and only rerun this effect if submitted value changes

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = {
      name
    }

    // Make a request for a user with a given ID
    axios.post(REACT_APP_BACKEND_URL, person)
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      });
    setSubmission(true)
  }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card raised={true}>
          <Typography variant="h3" component="h2">
            Morning Sun Ward
          </Typography>
          <Typography variant="h4" component="h2">
            Church Cleaning
          </Typography>
          <Typography variant="h5" component="h2">
            Please submit name to sign up. Thank you!
          </Typography>
          <Typography variant="h6" component="h2">
            Date: 09/18/2021 (Sat.)
          </Typography>
          <Typography variant="h6" component="h2">
            Time: 9:00am - 10:30am
          </Typography>
          <Typography variant="h6" component="h2">
            Location: Gary church building (33794 N Gary Rd, Queen Creek, AZ 85242)
          </Typography>
          {submitted ?
            <Card><Typography>Thanks for signing up!</Typography></Card>
            :
            <Card>
              <form onSubmit={handleSubmit} >
                <TextField value={name} onChange={(e) => { setName(e.target.value) }} id="outlined-basic" label="Name" variant="outlined" />
                <Button disabled={name ? false : true} onClick={handleSubmit} variant="contained">Submit</Button>
              </form>
            </Card>}
        </Card>
        <Card>
          <Typography>
            See List of those who have signed up
          </Typography>
          <List dense={true}>
            {cleaners.map((each, index) => (
              <ListItem key={index}>
                <ListItemText>{each.name}</ListItemText>
              </ListItem>
            )
            )}
          </List>
        </Card>
      </Container>
    </div >
  );
}

export default App;
