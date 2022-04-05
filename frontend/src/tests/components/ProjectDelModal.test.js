import React from 'react';
import { fireEvent, render } from "@testing-library/react";

import ProjectDelModal from '../../components/ProjectDelModal';

let props;

beforeEach(() => {
    props = {
        delModalOpen: true,
        setDelModalOpen: jest.fn(),
        deleteProject: jest.fn()
    };
});

test('Should render ProjectDelModal component correctly', () => {
    const { asFragment } = render(<ProjectDelModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render/fire delete button correctly', () => {
    const { getByTestId } = render(<ProjectDelModal {...props} />);
    const deleteButtonEl = getByTestId('delete_button');

    expect(deleteButtonEl.textContent).toBe('Delete');

    expect(props.deleteProject).toHaveBeenCalledTimes(0);

    fireEvent.click(deleteButtonEl);

    expect(props.deleteProject).toHaveBeenCalledTimes(1);
});