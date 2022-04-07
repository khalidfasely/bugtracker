import React from "react";
import { render } from "@testing-library/react";

import SelectUsers from "../../components/SelectUsers";

//Mock the react-select :: https://polvara.me/posts/testing-a-custom-select-with-react-testing-library
jest.mock("react-select", () => ({ options, value, onChange }) => {
    function handleChange(event) {
      const option = options.find(
        (option) => option.value === event.currentTarget.value
      );
      onChange(option);
    }
  
    return (
      <select multiple={true} data-testid="select" value={value} onChange={handleChange}>
        {options.map(({ label, value }) => (
          <option key={Math.random() * 10} value={value}>
            {label}
          </option>
        ))}
      </select>
    );
});

let props;

beforeEach(() => {
    props = {
        users: ["admin", "1"],
        selectedUsers: ["admin"],
        setSelectedUsers: jest.fn(),
        selectedAdmins: ["admin"],
        setSelectedAdmins: jest.fn(),
        errorSelect: null
    }
});

test('Should render SelectUsers components correctly', () => {
    const { asFragment } = render(<SelectUsers {...props} />);
    expect(asFragment()).toMatchSnapshot();
});