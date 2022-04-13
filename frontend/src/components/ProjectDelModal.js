import Modal from "react-modal";

const ProjectDelModal = ({ delModalOpen, setDelModalOpen, deleteProject }) => (
    <Modal
        className='delete-modal'
        isOpen={delModalOpen}
        onRequestClose={() => setDelModalOpen(false)}
    >
        <p className="modal__paragraph">If you delete this project there is no way to return it!</p>
        <button className="modal__del-button" onClick={deleteProject} data-testid='delete_button'>Delete</button>
    </Modal>
);

export default ProjectDelModal;