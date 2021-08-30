const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const handleEvent = (type, data) => {
  if (type == "CommentCreated") {
    if (data.content.includes('orange')) {
      data.status = 'rejected'
    } else {
      data.status = 'approved'
    }

    axios.post('http://139.59.71.106:4005/emit', {
      'type': 'CommentModerated',
      'data': data
    })
  }
}

app.post('/event', (req, res) => {
  const { type, data } = req.body
  handleEvent(type, data)
  res.send({})
})

const loadEventsFromEventBus = async () => {
  const events = await axios.get('http://139.59.71.106:4005/allEvents')
  events.body.forEach(event => {
    const { type, data } = event
    handleEvent(type, data)
  })
}

app.listen(4003, () => {
  loadEventsFromEventBus()
  console.log('Listening to 4003')
})