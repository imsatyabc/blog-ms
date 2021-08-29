
const ListComments = ({ comments }) => {
  const renderComments = comments.map(comment => {
    if (comment.status === 'pending') {
      return <li key={comment.id}>This comment is pending moderation.</li>
    }
    if (comment.status === 'approved') {
      return <li key={comment.id}><b>{comment.content}</b></li>
    }
    if (comment.status === 'rejected') {
      return <li key={comment.id}><i>This comment is rejected.</i></li>
    }
    return <li key={comment.id}>{comment.content}</li>
  })

  return <div>
    <ul>
      {renderComments}
    </ul>
  </div>
}

export default ListComments