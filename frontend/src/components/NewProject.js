import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';

import { startSetNewProject } from "../actions/newProject";
import { startSetUsers } from "../actions/users";

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

    let options = users?.map(user => ({ value: user, label: user }));


    const customTheme = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: 'orange',
            primary: 'red'
        }
    });

    const onChangeUsers = (selectedUsers, { action, removedValue }) => {
        switch (action) {
            case "remove-value":
            case "pop-value":
                if (removedValue.isFixed) {
                  return;
                }
                break;
            case "clear":
                selectedUsers = selectedUsers.filter(v => v.isFixed);
                break;
            default:
                break;
        };
        setSelectedUsers(selectedUsers);
    };

    const onChangeAdmins = (selectedAdmins, { action, removedValue }) => {
        switch (action) {
            case "remove-value":
            case "pop-value":
                if (removedValue.isFixed) {
                  return;
                }
                break;
            case "clear":
                selectedAdmins = selectedAdmins.filter(v => v.isFixed);
                break;
            default:
                break;
        };
        setSelectedAdmins(selectedAdmins);
    };

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
                {errorSelect && <p>{errorSelect}</p>}
                <Select
                    components={makeAnimated()}
                    value={selectedUsers}
                    theme={customTheme}
                    defaultValue={selectedUsers}
                    onChange={onChangeUsers}
                    options={options}
                    isClearable={!options && options.some(option => option.isFixed)}
                    placeholder='Select Users'
                    noOptionsMessage={() => 'No other user!'}
                    isMulti
                    isSearchable
                />
                <Select
                    components={makeAnimated()}
                    value={selectedAdmins}
                    theme={customTheme}
                    defaultValue={selectedAdmins}
                    onChange={onChangeAdmins}
                    options={selectedUsers}
                    isClearable={!options && options.some(option => option.isFixed)}
                    placeholder='Select Admins'
                    noOptionsMessage={() => 'No other user!'}
                    isMulti
                    isSearchable
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