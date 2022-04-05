import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Select from "./SelectUsers";
import { startSetEditBug, startSetNewBug } from "../actions/project";

export const NewBug = ({
    uname, users, on_project, startSetNewBug,
    isEdit, bug, setEditModalOpen, startSetEditBug
}) => {

    // change list string to list object for edit project
    let editUsers = [];
    let editAdmins = [];

    if (isEdit) {
        editAdmins = bug.admins.map(admin => (
            admin === uname ? {value: admin, label: admin, isFixed: true} : {value: admin, label: admin}
        ));

        editUsers = bug.users_with.map(user => (
            user === uname ? {value: user, label: user, isFixed: true} : {value: user, label: user}
        ));
    };

    const [title, setTitle] = useState(isEdit ? bug.title : '');
    const [errorTitle, setErrorTitle] = useState('');
    const [description, setDescription] = useState(isEdit ? bug.description : '');
    const [errorDescription, setErrorDescription] = useState('');
    const [classification, setClassification] = useState(isEdit ? bug.classification : 'high');
    const [isActive, setIsActive] = useState(isEdit ? bug.active : true);
    const [selectedUsers, setSelectedUsers] = useState(isEdit ? editUsers : [{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState(isEdit ? editAdmins : [{ value: uname, label: uname, isFixed: true}]);
    const [errorSelect, setErrorSelect] = useState('');

    const incorrectUsers = (users, admins) => {
        let arrUsers = users.map(user => user.value);
        let arrAdmins = admins.map(admin => admin.value);

        for (let i = 0; i < arrAdmins.length; i++) {
            if (!arrUsers.includes(arrAdmins[i])) {
                return 'Must all admins be users first!';
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorTitle('');
        setErrorDescription('');
        setErrorSelect('');

        const isIncorrectUsers = incorrectUsers(selectedUsers, selectedAdmins);
        const availableTitle = title.replace(/\s/g, '').length >= 15;
        const availableDescription = description.replace(/\s/g, '').length >= 120;

        if (isIncorrectUsers) {
            setErrorSelect(isIncorrectUsers);
            return;
        };

        if (!availableTitle) {
            setErrorTitle('Title must be 15 character or more');
        };

        if (!availableDescription) {
            setErrorDescription('Description must be 120 character or more');
        };

        if (availableTitle && availableDescription) {
            let arrUsers = selectedUsers.map(user => user.value);
            let arrAdmins = selectedAdmins.map(admin => admin.value);

            if (isEdit) {
                startSetEditBug(bug.id, {
                    title,
                    description,
                    users: arrUsers,
                    admins: arrAdmins,
                    active: isActive,
                    classification
                })
                .then(() => setEditModalOpen(false));
                return;
            }

            startSetNewBug(on_project, {
                title,
                description,
                isActive,
                classification,
                users: arrUsers,
                admins: arrAdmins
            }).then(result => {
                if (result.message) {
                    setErrorTitle(result.message);
                    return;
                }

                if (result.bug) {
                    setTitle('');
                    setDescription('');
                    setSelectedUsers([{ value: uname, label: uname, isFixed: true}]);
                    setSelectedAdmins([{ value: uname, label: uname, isFixed: true}]);
                }
            });
        };
    };

    if (!uname) {
        return <div><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Bug!</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit} data-testid='newbug_form'>
                <div>
                    <p data-testid='title_error'>{errorTitle ? errorTitle : null}</p>
                    <input
                        maxLength={120}
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        data-testid='title_input'
                    />
                </div>
                <div>
                    <p data-testid='description_error'>{errorDescription ? errorDescription : null}</p>
                    <textarea
                        maxLength={255}
                        placeholder="Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        data-testid='description_input'
                    />
                </div>
                <div>
                    <input
                        id='active' type='checkbox' name='active'
                        onChange={(e) => setIsActive(e.target.checked)}
                        checked={isActive}
                        data-testid='active_checkbox'
                    />
                    <label htmlFor="active">Active</label>
                </div>
                <div>
                    <input
                        id='high' type='radio' name='classification' value='high'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'high'}
                        data-testid='high_radio'
                    />
                    <label htmlFor="high">High</label>

                    <input
                        id='med' type='radio' name='classification' value='medium'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'medium'}
                        data-testid='medium_radio'
                    />
                    <label htmlFor="med">Medium</label>

                    <input
                        id='low' type='radio' name='classification' value='low'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'low'}
                        data-testid='low_radio'
                    />
                    <label htmlFor="low">Low</label>
                </div>
                <Select
                    users={users}
                    selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}
                    selectedAdmins={selectedAdmins} setSelectedAdmins={setSelectedAdmins}
                    errorSelect={errorSelect}
                />
                {
                    isEdit ?
                    <button>Edit</button> :
                    <button>Add</button>
                }
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
    startSetNewBug: (on_project, bugData) => dispatch(startSetNewBug(on_project, bugData)),
    startSetEditBug: (bid, updates) => dispatch(startSetEditBug(bid, updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBug);