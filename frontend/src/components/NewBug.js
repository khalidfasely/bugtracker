import { useState } from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const NewBug = ({ uname, users }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [classification, setClassification] = useState('high');
    const [isActive, setIsActive] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [errorSelect, setErrorSelect] = useState('');

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
                    <input id='active' type='checkbox' name='active' value={isActive} onChange={(e) => setIsActive(e.target.checked)} checked={isActive} />
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
                <button>Add</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

export default connect(mapStateToProps)(NewBug);