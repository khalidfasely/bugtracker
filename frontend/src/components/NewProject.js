//import React, { useEffect } from "react";
//import Select from "react-select";
//const options = [
//  { value: "apple", label: "Apple", isFixed: true },
//  { value: "orange", label: "Orange" },
//  { value: "grape", label: "Grape" }
//];
//const orderOptions = values => {
//  return (
//    values &&
//    values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed))
//  );
//};
//export default function App() {
//  const [value, setValue] =   React.useState([...options]);
//  //Important part
//  const onChange = (value, { action, removedValue }) => {
//    switch (action) {
//      case "remove-value":
//      case "pop-value":
//        if (removedValue.isFixed) {
//          return;
//        }
//        break;
//      case "clear":
//        value = options.filter(v => v.isFixed);
//        break;
//      default:
//        break;
//    }
//    value = orderOptions(value);
//    setValue(value);
//  };
//
//  useEffect(() => console.log(value), [value])
//
//  return (
//    <div>
//      <Select
//        value={value}
//        isMulti
//        isClearable={value && value.some(v => !v.isFixed)}
//        name="fruit"
//        classNamePrefix="select"
//        onChange={onChange}
//        options={options}
//      />
//    </div>
//  );
//}

import { useState } from "react";
import { connect } from "react-redux";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const NewProject = ({ uname }) => {
    const [projectName, setProjectName] = useState('');
    const [errorName, setErrorName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [selectedAdmins, setSelectedAdmins] = useState([{ value: uname, label: uname, isFixed: true}]);
    const [errorSelect, setErrorSelect] = useState('');

    const options = [
        { value: 'user2', label: 'User 2'},
        { value: 'user3', label: 'User 3'},
    ];

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
            console.log('try to create!')
        }
        //console.log(projectName, selectedUsers, selectedAdmins);
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
                    autoFocus
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
                    //components={makeAnimated()}
                    //theme={customTheme}
                    //defaultValue={selectedAdmins}
                    //onChange={setSelectedAdmins}
                    //options={selectedUsers}
                    //placeholder='Select Admins'
                    //noOptionsMessage={() => 'No other user!'}
                    //isMulti
                    //isSearchable
                />
                <button>Create.</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    uname: state.auth.uname
});

export default connect(mapStateToProps)(NewProject);