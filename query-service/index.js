const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

const handleEvent = (type, data) => {
  if (type == 'PostCreated') {
    const { id, title } = data
    posts[id] = {
      id,
      title,
      comments: []
    }
  }

  if (type == 'CommentCreated') {
    const { id, content, postId, status } = data
    posts[postId].comments.push({ id, content, status })
  }

  if (type == 'CommentUpdated') {
    const { id, content, postId, status } = data
    var comment = posts[postId].comments.find(comment => {
      return comment.id == id
    })
    comment.status = status
    console.log(id, content, status)
    console.log(posts[postId].comments)
  }
}

app.get('/posts', (req, res) => {
  res.send(posts)
})

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

app.listen(4002, async () => {
  await loadEventsFromEventBus()
  console.log('Listening on 4002')
})
