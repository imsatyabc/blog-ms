const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/emit', (req, res) => {
  events.push(req.body)
  axios.post('http://139.59.71.106:4000/event', req.body)
  axios.post('http://139.59.71.106:4001/event', req.body)
  axios.post('http://139.59.71.106:4002/event', req.body)
  axios.post('http://139.59.71.106:4003/event', req.body)

  res.send({ status: 'OK' })
})

app.get('/allEvents', (req, res) => {
  res.send(events)
})

app.listen(4005, () => {
  console.log('Listening on 4005')
})