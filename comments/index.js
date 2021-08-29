const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors')
const axios = require('axios')
const app = express();
app.use(bodyParser.json());
app.use(cors())
const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
  const oldComments = commentsByPostId[req.params.id] || [];
  const id = randomBytes(4).toString('hex');
  const content = req.body.content;

  oldComments.push({
    id, content, status: 'pending'
  })
  commentsByPostId[req.params.id] = oldComments

  axios.post('http://139.59.71.106:4005/emit', {
    'type': 'CommentCreated',
    'data': {
      id, content, postId: req.params.id, status: 'pending'
    }
  })

  res.status(201).send(commentsByPostId[req.params.id])
})

app.post('/event', (req, res) => {
  const { type, data } = req.body

  if (type == "CommentModerated") {
    const comment = commentsByPostId[data.postId].find(comment => {
      return comment.id == data.id
    })

    comment.status = data.status

    axios.post('http://139.59.71.106:4005/emit', {
      'type': 'CommentUpdated',
      'data': data
    })
  }

  res.send({})
})

app.listen(4001, () => {
  console.log('Listening to 4001')
})