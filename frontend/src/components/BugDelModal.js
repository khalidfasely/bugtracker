import Modal from "react-modal";

const BugDelModal = ({ delModalOpen, setDelModalOpen, deleteBug }) => (
    <Modal
        isOpen={delModalOpen}
        onRequestClose={() => setDelModalOpen(false)}
    >
        If you delete this bug there is no way to return it!
        <button onClick={deleteBug} data-testid='delete_button'>Delete</button>
    </Modal>
);

export default BugDelModal;