import Modal from "react-modal";

const CommentDelModal = ({ delModalOpen, setDelModalOpen, deleteComment }) => (
    <Modal
      className="delete-modal"
      isOpen={delModalOpen}
      onRequestClose={() => setDelModalOpen(false)}
    >
      <p className="modal__paragraph">If you delete this comment there is no way to return it!</p>
      <button className="modal__del-button" onClick={deleteComment} data-testid='delete_button'>Delete</button>
    </Modal>
);

export default CommentDelModal;