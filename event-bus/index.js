const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/emit', (req, res) => {
  axios.post('http://localhost:4000/event', req.body)
  axios.post('http://localhost:4001/event', req.body)
  axios.post('http://localhost:4002/event', req.body)
  axios.post('http://localhost:4003/event', req.body)

  res.send({ status: 'OK' })
})

app.listen(4005, () => {
  console.log('Listening on 4005')
})