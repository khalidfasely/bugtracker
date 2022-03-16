const Comment = ({ comment }) => {
    return (
        <div>
          <p>{comment.id}</p>
          <p>{comment.content}</p>
          <p>{comment.user.username}</p>
          <p>{comment.time}</p>
        </div>
    );
};

export default Comment;