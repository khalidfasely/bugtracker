import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, Link } from 'react-router-dom';

import { startSetNewProject } from "../actions/newProject";
import { startSetUsers } from "../actions/users";
import SelectUsers from "./SelectUsers";

const NewProject = ({ uname, users, startSetNewProject, startSetUsers }) => {
    const history = useNavigate();

    const [projectName, setProjectName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState([{ value: uname, label: uname, isFixed: true}]);
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
            startSetNewProject({ projectName, arrUsers, arrAdmins}).then(result => history(`/project/${result.project.id}`));
        };
    };

    if (!uname) {
        return <div><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Project!</div>;
    }

    return (
        <div>
            <form onSubmit={tryCreateProject}>
                {errorName && <p>{errorName}</p>}
                <input
                    name="name"
                    placeholder="Project's Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    autoFocus
                />
                <SelectUsers
                    users={users}
                    selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}
                    selectedAdmins={selectedAdmins} setSelectedAdmins={setSelectedAdmins}
                    errorSelect={errorSelect}
                />
                <button>Create.</button>
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
    startSetUsers: () => dispatch(startSetUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProject);