import Modal from "react-modal";

const CommentDelModal = ({ delModalOpen, setDelModalOpen, deleteComment }) => (
    <Modal
      isOpen={delModalOpen}
      onRequestClose={() => setDelModalOpen(false)}
    >
        Alright <button onClick={deleteComment}>Delete</button>
    </Modal>
);

export default CommentDelModal;