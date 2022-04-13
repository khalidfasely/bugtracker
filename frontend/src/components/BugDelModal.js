import Modal from "react-modal";

const BugDelModal = ({ delModalOpen, setDelModalOpen, deleteBug }) => (
    <Modal
        className="delete-modal"
        isOpen={delModalOpen}
        onRequestClose={() => setDelModalOpen(false)}
    >
        <p className="modal__paragraph">If you delete this bug there is no way to return it!</p>
        <button className="modal__del-button" onClick={deleteBug} data-testid='delete_button'>Delete</button>
    </Modal>
);

export default BugDelModal;