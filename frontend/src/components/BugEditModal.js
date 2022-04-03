import Modal from "react-modal";

import NewBug from "./NewBug";

const BugEditModal = ({
    editModalOpen, setEditModalOpen,
    users, bug
}) => (
    <Modal
        isOpen={editModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
    >
        <NewBug users={users} isEdit={true} bug={bug} setEditModalOpen={setEditModalOpen} />
    </Modal>
);

export default BugEditModal;