import Modal from "react-modal";

const ProjectDelModal = ({ delModalOpen, setDelModalOpen, deleteProject }) => (
    <Modal
        isOpen={delModalOpen}
        onRequestClose={() => setDelModalOpen(false)}
    >
        Delete
        <button onClick={deleteProject}>Delete</button>
    </Modal>
);

export default ProjectDelModal;