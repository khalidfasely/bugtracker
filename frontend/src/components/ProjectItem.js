import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

import ProjectData from "./ProjectData";
import BugsList from "./BugsList";
import NewBug from "./NewBug";
import NewProject from "./NewProject";
import { useState } from "react";
import { startSetDelProject } from "../actions/delProject";

const ProjectItem = ({uname, projectItem, bugs, startSetDelProject}) => {
    const history = useNavigate();

    const [delModalOpen, setDelModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const deleteProject = () => {
        startSetDelProject(projectItem.id).then(result => {
            history('/');
            setDelModalOpen(false);
        });
    }

    return (
        <div>
            {
                projectItem?.users_with?.includes(uname) ?
                <div>
                    <ProjectData projectItem={projectItem} />
                    <hr />
                    {
                        uname === projectItem.user.username &&
                        <div>
                            <button onClick={() => setEditModalOpen(true)}>Edit</button>
                            <button onClick={() => setDelModalOpen(true)}>Delete</button>
                        </div>
                    }
                    <hr />
                    <NewBug users={projectItem.users_with} on_project={projectItem.id} />
                    <hr />
                    <div>
                        { bugs?.map(bug => (
                            <Link to={`/project/${bug?.on_project}/bug/${bug?.id}`}>
                                <BugsList bug={bug} />
                            </Link>)
                        )}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new-project">Create one!</Link></div>
            }
            <Modal
                isOpen={delModalOpen}
                onRequestClose={() => setDelModalOpen(false)}
            >
                Delete
                <button onClick={deleteProject}>Delete</button>
            </Modal>
            <Modal
                isOpen={editModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
            >
                <NewProject isEdit={true} projectItemEdit={projectItem} setEditModalOpen={setEditModalOpen} />
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    projectItem: state.projectItem.project,
    bugs: state.projectItem.bugs
});

const mapDispatchToProps = (dispatch) => ({
    startSetDelProject: (pid) => dispatch(startSetDelProject(pid))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);