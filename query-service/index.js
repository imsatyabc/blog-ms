const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.post('/event', (req, res) => {

  const { type } = req.body

  if (type == 'PostCreated') {
    const { id, title } = req.body.data
    posts[id] = {
      id,
      title,
      comments: []
    }
  }

  if (type == 'CommentCreated') {
    const { id, content, postId, status } = req.body.data
    posts[postId].comments.push({ id, content, status })
  }

  if (type == 'CommentUpdated') {
    const { id, content, postId, status } = req.body.data
    var comment = posts[postId].comments.find(comment => {
      return comment.id == id
    })
    comment.status = status
    console.log(id, content, status)
    console.log(posts[postId].comments)
  }

  res.send({ status: 'OK' })
})

app.listen(4002, () => {
  console.log('Listening on 4002')
})
