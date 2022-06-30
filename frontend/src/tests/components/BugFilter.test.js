import { render, fireEvent, act } from "@testing-library/react";

import { BugFilter } from "../../components/BugFilter";

let props;

beforeEach(() => {
    props = {
        filters: {text: '', sort: ''},
        setTextFilter: jest.fn(),
        sortByDefault: jest.fn(),
        sortByPriority: jest.fn()
    };
});

test('Should render BugFilter component correctly', () => {
    const { asFragment } = render(<BugFilter {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should change search input value', () => {
    const { getByTestId } = render(<BugFilter {...props} />);
    const searchInputEl = getByTestId("search_input");

    fireEvent.change(searchInputEl, {
        target: {
            value: 'Username'
        }
    });

    //expect(props.setTextFilter).toHaveBeenCalledTimes(1);
    expect(props.setTextFilter).toHaveBeenLastCalledWith('Username');
});

test('Should sort by default and priority', () => {
    const { getByTestId } = render(<BugFilter {...props} />);
    const selectInputEl = getByTestId("select_input");

    fireEvent.change(selectInputEl, {
        target: {
            value: 'priority'
        }
    });

    expect(props.sortByPriority).toHaveBeenCalled();

    fireEvent.change(selectInputEl, {
        target: {
            value: ''
        }
    });

    expect(props.sortByDefault).toHaveBeenCalled();
});