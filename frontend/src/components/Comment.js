import { useState } from "react";
import { connect } from "react-redux";
import Modal from 'react-modal';

import NewComment from "./NewComment";

const Comment = ({ comment, uname }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [delModalOpen, setDelModalOpen] = useState(false);

    const deleteComment = () => {
      fetch(`/api/delete-comment/${comment.id}`)
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(er => console.error(er));
      setDelModalOpen(false);
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
              <button onClick={() => setIsEdit(true)}>Edit</button>
              <button onClick={() => setDelModalOpen(true)}>Delete</button>
            </div>
          }
          <Modal
            isOpen={delModalOpen}
            onRequestClose={() => setDelModalOpen(false)}
          >Alright<button onClick={deleteComment}>Delete</button></Modal>
        </div>
    );
};

const mapStateToProps = (state) => ({
  uname: state.auth.uname
});

export default connect(mapStateToProps)(Comment);