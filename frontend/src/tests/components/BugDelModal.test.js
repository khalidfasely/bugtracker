import React from "react";
import { render, fireEvent } from '@testing-library/react';

import BugDelModal from '../../components/BugDelModal';

let props;

beforeEach(() => {
    props = {
        delModalOpen: true,
        setDelModalOpen: jest.fn(),
        deleteBug: jest.fn()
    };
});

test('Should render BugDelModal component correctly', () => {
    const { asFragment } = render(<BugDelModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire delete button correctly', () => {
    const { getByTestId } = render(<BugDelModal {...props} />);
    const deleteButtonEl = getByTestId('delete_button');
    expect(deleteButtonEl.textContent).toBe('Delete');

    expect(props.deleteBug).toHaveBeenCalledTimes(0);

    fireEvent.click(deleteButtonEl);

    expect(props.deleteBug).toHaveBeenCalledTimes(1);
});