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
      return <div className="comment">
        <NewComment commentEdit={comment.content} commentId={comment.id} setIsEdit={setIsEdit} />
      </div>
    };
    
    return (
        <div className="comment">
          <div className="comment__user-btns">
            <p className="comment__user">{comment.user.username}</p>
            {
              uname === comment.user.username &&
              <div className="comment-buttons">
                <button onClick={() => setIsEdit(true)} data-testid='edit_button' >Edit</button>
                <button onClick={() => setDelModalOpen(true)}>Delete</button>
              </div>
            }
          </div>
          <p className="comment__content">{comment.content}</p>
          <p className="comment__time">{comment.time}</p>
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