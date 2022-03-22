import { useState } from "react";
import { connect } from "react-redux";

import Select from "./SelectUsers";

const NewBug = ({ uname, users }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [classification, setClassification] = useState('high');
    const [isActive, setIsActive] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [errorSelect, setErrorSelect] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(title, description, classification, isActive)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <div>
                    <input id='active' type='checkbox' name='active' onChange={(e) => setIsActive(e.target.checked)} checked={isActive} />
                    <label htmlFor="active">Active</label>
                </div>
                <div>
                    <input id='high' type='radio' name='classification' value='high' onChange={(e) => setClassification(e.target.value)} checked={classification === 'high'} />
                    <label htmlFor="high">High</label>
                    <input id='med' type='radio' name='classification' value='medium' onChange={(e) => setClassification(e.target.value)} checked={classification === 'medium'} />
                    <label htmlFor="med">Medium</label>
                    <input id='low' type='radio' name='classification' value='low' onChange={(e) => setClassification(e.target.value)} checked={classification === 'low'} />
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

export default connect(mapStateToProps)(NewBug);