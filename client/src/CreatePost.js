import { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('')

  const submitForm = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:4000/posts', {
      title: title
    })

    window.location.reload()
  }

  return <div>
    <h1>Create Post</h1>
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label className="form-label">Enter Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
      </div>
      <button className="btn btn-primary">Create Post</button>
    </form>
  </div>
}

export default CreatePost