import { useState } from "react";
import { connect } from "react-redux";

import NewComment from "./NewComment";
import { startSetDeleteComment } from "../actions/bug";
import CommentDelModal from "./CommentDelModal";

export const Comment = ({ comment, uname, startSetDeleteComment }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [delModalOpen, setDelModalOpen] = useState(false);

    const deleteComment = () => {
      startSetDeleteComment(comment.id).then(() => {
        setDelModalOpen(false);
      });
    };
    
    if (isEdit) {
      return <NewComment commentEdit={comment.content} commentId={comment.id} setIsEdit={setIsEdit} />
    };
    
    return (
        <div>
          <p>{comment.id}</p>
          <p>{comment.content}</p>
          <p>{comment.user.username}</p>
          <p>{comment.time}</p>
          {
            uname === comment.user.username &&
            <div>
              <button onClick={() => setIsEdit(true)} data-testid='edit_button' >Edit</button>
              <button onClick={() => setDelModalOpen(true)}>Delete</button>
            </div>
          }
          <CommentDelModal
            delModalOpen={delModalOpen}
            setDelModalOpen={setDelModalOpen}
            deleteComment={deleteComment}
          />
        </div>
    );
};

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
  startSetDeleteComment: (cid) => dispatch(startSetDeleteComment(cid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);