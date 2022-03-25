import { useState } from "react";
import { connect } from "react-redux";
import NewComment from "./NewComment";

const Comment = ({ comment, uname }) => {
    const [isEdit, setIsEdit] = useState(false);
    
    if (isEdit) {
      return <NewComment commentEdit={comment.content} commentId={comment.id} setIsEdit={setIsEdit} />
    };
    
    return (
        <div>
          <p>{comment.id}</p>
          <p>{comment.content}</p>
          <p>{comment.user.username}</p>
          <p>{comment.time}</p>
          {uname === comment.user.username && <button onClick={() => setIsEdit(true)}>Edit</button>}
        </div>
    );
};

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

export default connect(mapStateToProps)(Comment);