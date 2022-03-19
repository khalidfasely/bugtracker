import { useEffect, useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const SelectUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const options = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
  ];

  useEffect(() => console.log(selectedUsers), [selectedUsers])

  const customTheme = (theme) => ({
      ...theme,
      colors: {
          ...theme.colors,
          primary25: 'orange',
          primary: 'red'
      }
  });

  return (
    <div>
      <Select
        components={makeAnimated()}
        theme={customTheme}
        defaultValue={selectedUsers}
        onChange={setSelectedUsers}
        options={options}
        placeholder='Select Users'
        noOptionsMessage={() => 'No other user!'}
        isMulti
        autoFocus
        isSearchable
      />
      <Select
        components={makeAnimated()}
        theme={customTheme}
        defaultValue={selectedAdmins}
        onChange={setSelectedAdmins}
        options={selectedUsers}
        placeholder='Select Admins'
        noOptionsMessage={() => 'No other user!'}
        isMulti
        isSearchable
      />
    </div>
  );
}

export default SelectUsers;