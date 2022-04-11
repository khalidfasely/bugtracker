import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';
import { startSetEditProject } from "../actions/editProject";

import { startSetNewProject } from "../actions/newProject";
import { startSetUsers } from "../actions/users";
import SelectUsers from "./SelectUsers";

export const NewProject = ({ uname, users, startSetNewProject, startSetUsers,
        isEdit, projectItemEdit, setEditModalOpen, startSetEditProject
    }) => {
    const history = useNavigate();

    // change list string to list object for edit project
    let editUsers = [];
    let editAdmins = [];

    if (isEdit) {
        editAdmins = projectItemEdit.admins.map(admin => (
            admin === uname ? {value: admin, label: admin, isFixed: true} : {value: admin, label: admin}
        ));

        editUsers = projectItemEdit.users_with.map(user => (
            user === uname ? {value: user, label: user, isFixed: true} : {value: user, label: user}
        ));
    };

    const [projectName, setProjectName] = useState(isEdit ? projectItemEdit.name : '');
    const [errorName, setErrorName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState(isEdit ? editUsers : [{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState(isEdit ? editAdmins : [{ value: uname, label: uname, isFixed: true}]);
    const [errorSelect, setErrorSelect] = useState('');

    useEffect(() => {
        startSetUsers();
    }, [])

    const incorrectUsers = (users, admins) => {
        let arrUsers = users.map(user => user.value);
        let arrAdmins = admins.map(admin => admin.value);

        for (let i = 0; i < arrAdmins.length; i++) {
            if (!arrUsers.includes(arrAdmins[i])) {
                return 'Must all admins be users first!';
            }
        }
    };

    const tryCreateProject = (e) => {
        e.preventDefault();

        setErrorName('');
        setErrorSelect('');

        const isIncorrectUsers = incorrectUsers(selectedUsers, selectedAdmins);
        //correctUsers(selectedUsers, selectedAdmins);

        if (isIncorrectUsers) {
            setErrorSelect(isIncorrectUsers);
            return;
        }

        const correctProjectName = projectName.replace(/\s/g, '').length <= 15;

        if (correctProjectName) {
            setErrorName('Project\'s name must be bigger than 15 characters!');
        } else {
            let arrUsers = selectedUsers.map(user => user.value);
            let arrAdmins = selectedAdmins.map(admin => admin.value);

            if (isEdit) {
                startSetEditProject(projectItemEdit.id, { name: projectName, users: arrUsers, admins: arrAdmins })
                .then(() => setEditModalOpen(false))
                .catch(er => console.error(er));
                return;
            }

            startSetNewProject({ projectName, arrUsers, arrAdmins})
            .then(result => history(`/project/${result.project.id}`))
            .catch(er => console.error(er));
        };
    };

    if (!uname) {
        return <div><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Project!</div>;
    }

    return (
        <div className="project-form-container">
            <form onSubmit={tryCreateProject} data-testid='newproject_form'>
                <p data-testid='name_error'>{errorName ? errorName : null}</p>
                <input
                    className="project-form__input"
                    name="name"
                    placeholder="Project's Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    maxLength={120}
                    autoFocus
                    data-testid='name_input'
                />
                <SelectUsers
                    users={users}
                    selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}
                    selectedAdmins={selectedAdmins} setSelectedAdmins={setSelectedAdmins}
                    errorSelect={errorSelect}
                />
                <div className="buttons-container">
                    {
                        isEdit ?
                        <button>Save</button> :
                        <button>Create</button>
                    }
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname,
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    startSetNewProject: (project) => dispatch(startSetNewProject(project)),
    startSetEditProject: (pid, updates) => dispatch(startSetEditProject(pid, updates)),
    startSetUsers: () => dispatch(startSetUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);