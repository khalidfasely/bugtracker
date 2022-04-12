import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import ProjectData from "./ProjectData";
import BugsList from "./BugsList";
import NewBug from "./NewBug";
import { useState } from "react";
import { startSetDelProject } from "../actions/delProject";
import ProjectDelModal from "./ProjectDelModal";
import ProjectEditModal from "./ProjectEditModal";

export const ProjectItem = ({uname, projectItem, bugs, startSetDelProject}) => {
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
                    <div className="project-infos">
                        <ProjectData projectItem={projectItem} />
                        {
                            uname === projectItem.user.username &&
                            <div className="project-buttons">
                                <button onClick={() => setEditModalOpen(true)}>Edit</button>
                                <button onClick={() => setDelModalOpen(true)}>Delete</button>
                            </div>
                        }
                    </div>
                    <NewBug users={projectItem.users_with} on_project={projectItem.id} />
                    <div className="bugs">
                        <p>See all bugs:</p>
                        { bugs?.map(bug => (
                            <div className="bug-list-item-container">
                                <Link to={`/project/${bug?.on_project}/bug/${bug?.id}`} key={bug?.id}>
                                    <BugsList bug={bug} />
                                </Link>
                            </div>)
                        )}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new-project">Create one!</Link></div>
            }
            <ProjectDelModal
                delModalOpen={delModalOpen}
                setDelModalOpen={setDelModalOpen}
                deleteProject={deleteProject}
            />
            <ProjectEditModal
                editModalOpen={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                projectItem={projectItem}
            />
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