import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectUsers = ({ users, selectedUsers, setSelectedUsers, selectedAdmins, setSelectedAdmins, errorSelect }) => {

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

    return (
        <div>
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
        </div>
    );
}

export default SelectUsers;