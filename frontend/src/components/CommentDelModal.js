import Modal from "react-modal";

const CommentDelModal = ({ delModalOpen, setDelModalOpen, deleteComment }) => (
    <Modal
      isOpen={delModalOpen}
      onRequestClose={() => setDelModalOpen(false)}
    >
        Alright <button onClick={deleteComment} data-testid='delete_button'>Delete</button>
    </Modal>
);

export default CommentDelModal;