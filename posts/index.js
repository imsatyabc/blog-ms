const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/posts', (req, res) => {
  const title = req.body.title
  const id = randomBytes(4).toString('hex')

  posts[id] = {
    id, title
  }

  axios.post('http://139.59.71.106:4005/emit', {
    'type': 'PostCreated',
    'data': {
      id, title
    }
  })

  res.status(201).send(posts[id])
})

app.post('/event', (req, res) => {
  console.log(req.body)
  res.send(true)
})

app.listen(4000, () => {
  console.log('Listening to 4000')
})