import axios from "axios";
import { useState } from "react"

const CreateComments = ({ post }) => {
  const [content, setContent] = useState('')

  const submitForm = async (e) => {
    e.preventDefault();

    await axios.post(`http://139.59.71.106:4001/posts/${post}/comments`, {
      content
    })

    window.location.reload()
  }

  return <div>
    <form onSubmit={submitForm}>
      <div className="form-group">
        <label className="form-label">Comment</label>
        <input type="text" className="form-control" value={content} onChange={e => setContent(e.target.value)} />
      </div>
      <button className="btn btn-success">Create Comment</button>
    </form>
  </div>

}


export default CreateComments