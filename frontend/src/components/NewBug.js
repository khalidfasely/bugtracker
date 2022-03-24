import { useState } from "react";
import { connect } from "react-redux";
import { startSetNewBug } from "../actions/project";

import Select from "./SelectUsers";

const NewBug = ({ uname, users, on_project, startSetNewBug }) => {
    const [title, setTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorDescription, setErrorDescription] = useState('');
    const [classification, setClassification] = useState('high');
    const [isActive, setIsActive] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState([{ value: uname, label: uname, isFixed: true}]);
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
                }
            });
        };
    };

    if (!uname) {
        return <div><Link to='/login'>Login</Link> or <Link to='/register'>Sign In</Link> to Add a Bug!</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    {errorTitle && <p>{errorTitle}</p>}
                    <input maxLength={120} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div>
                    {errorDescription && <p>{errorDescription}</p>}
                    <textarea maxLength={255} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div>
                    <input id='active' type='checkbox' name='active' onChange={(e) => setIsActive(e.target.checked)} checked={isActive} />
                    <label htmlFor="active">Active</label>
                </div>
                <div>
                    <input
                        id='high' type='radio' name='classification' value='high'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'high'}
                    />
                    <label htmlFor="high">High</label>

                    <input
                        id='med' type='radio' name='classification' value='medium'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'medium'}
                    />
                    <label htmlFor="med">Medium</label>

                    <input
                        id='low' type='radio' name='classification' value='low'
                        onChange={(e) => setClassification(e.target.value)}
                        checked={classification === 'low'}
                    />
                    <label htmlFor="low">Low</label>
                </div>
                <Select
                    users={users}
                    selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers}
                    selectedAdmins={selectedAdmins} setSelectedAdmins={setSelectedAdmins}
                    errorSelect={errorSelect}
                />
                <button>Add</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

const mapDispatchToProps = (dispatch) => ({
    startSetNewBug: (on_project, bugData) => dispatch(startSetNewBug(on_project, bugData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewBug);