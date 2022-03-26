import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

import ProjectData from "./ProjectData";
import BugsList from "./BugsList";
import NewBug from "./NewBug";
import { useState } from "react";

const ProjectItem = ({uname, projectItem, bugs}) => {
    const [delModalOpen, setDelModalOpen] = useState(false);

    const deleteProject = () => {
        console.log('deleting!');
        fetch(`/api/delete-project/${projectItem.id}`)
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(er => console.error(er));

        setDelModalOpen(false);
    }

    return (
        <div>
            {
                projectItem?.users_with?.includes(uname) ?
                <div>
                    **** project <br /><ProjectData projectItem={projectItem} />
                    **** interact with project <br />
                    {
                        uname === projectItem.user.username &&
                        <div>
                            <button>Edit</button>
                            <button onClick={() => setDelModalOpen(true)}>Delete</button>
                        </div>
                    }
                    **** new bug <br /><NewBug users={projectItem.users_with} on_project={projectItem.id} />
                    **** bugs <br /><div>
                        { bugs.map(bug => (
                            <Link to={`/project/${bug.on_project}/bug/${bug.id}`}>
                                <BugsList bug={bug} />
                            </Link>)
                        )}
                    </div>
                </div> :
                <div>Not able to see this project! <Link to="/new">Create one!</Link></div>
            }
            <Modal
                isOpen={delModalOpen}
                onRequestClose={() => setDelModalOpen(false)}
            >
                Delete
            <button onClick={deleteProject}>Delete</button></Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    projectItem: state.projectItem.project,
    bugs: state.projectItem.bugs
});

export default connect(mapStateToProps)(ProjectItem);