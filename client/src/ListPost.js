import axios from 'axios'
import { useState, useEffect } from 'react'
import CreateComments from './CreateComments'
import ListComments from './ListComments'

const ListPost = () => {
  const [posts, setPosts] = useState({})

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('http://139.59.71.106:4002/posts')
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  const renderPosts = Object.values(posts).map(post => {
    return <div className="card mb-2" style={{ width: "30%" }} key={post.id}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
        </h5>
        <ListComments comments={post.comments} />
        <CreateComments post={post.id} />
      </div>
    </div>
  })

  return <div className="d-flex justify-content-between w-100 flex-wrap">
    {renderPosts}
  </div>
}

export default ListPost