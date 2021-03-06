import Modal from "react-modal";

import NewProject from "./NewProject";

const ProjectEditModal = ({ editModalOpen, setEditModalOpen, projectItem }) => (
    <Modal
        className="edit-modal"
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
    >
        <NewProject isEdit={true} projectItemEdit={projectItem} setEditModalOpen={setEditModalOpen} />
    </Modal>
);

export default ProjectEditModal;