const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/event', (req, res) => {
  const { type, data } = req.body

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

  res.send({})
})

app.listen(4003, () => {
  console.log('Listening to 4003')
})