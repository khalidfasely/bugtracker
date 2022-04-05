import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { NewProject } from '../../components/NewProject';
import project from '../fixtures/project';

let newProjectProps, editProjectProps;

beforeEach(() => {
    newProjectProps = {
        uname: 'admin',
        users: ['admin', '1'],
        startSetNewProject: jest.fn(() => Promise.resolve({ project: { id: 1 } })),
        startSetUsers: jest.fn()
    }
    editProjectProps = {
        isEdit: true,
        projectItemEdit: project,
        setEditModalOpen: jest.fn(),
        startSetEditProject: jest.fn(() => Promise.resolve({}))
    }
});

test('Should render NewProject component correctly without props(uname)', () => {
    const { asFragment } = render(<NewProject startSetUsers={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewProject component correctly with new project props', () => {
    const { asFragment } = render(<NewProject {...newProjectProps} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewProject component correctly with edit project props', () => {
    const { asFragment } = render(<NewProject {...{...newProjectProps, ...editProjectProps}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should change name input correctly in new project', () => {
    const { getByTestId } = render(<NewProject {...newProjectProps} />);
    const nameInputEl = getByTestId('name_input');

    expect(nameInputEl.value).toBe('');

    fireEvent.change(nameInputEl, {
        target: { value: 'New name for the new project!' }
    });

    expect(nameInputEl.value).toBe('New name for the new project!');
});

test('Should change name input correctly in edit project', () => {
    const { getByTestId } = render(<NewProject {...{...newProjectProps, ...editProjectProps}} />);
    const nameInputEl = getByTestId('name_input');

    expect(nameInputEl.value).toBe(editProjectProps.projectItemEdit.name);

    fireEvent.change(nameInputEl, {
        target: { value: 'New name for the new project!' }
    });

    expect(nameInputEl.value).toBe('New name for the new project!');
});

test('Should display an error if name\'s length < 15', () => {
    const { getByTestId } = render(<NewProject {...newProjectProps} />);
    const formEl = getByTestId('newproject_form');
    const nameInputEl = getByTestId('name_input');
    const nameErrorEl = getByTestId('name_error');

    expect(nameErrorEl.textContent).toBe('');

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(nameErrorEl.textContent).toBe('Project\'s name must be bigger than 15 characters!');

    fireEvent.change(nameInputEl, {
        target: { value: 'This is new project to make the error gone' }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(nameErrorEl.textContent).toBe('');
});

test('Should fire startSetNewProject correctly', () => {
    const { getByTestId } = render(<NewProject {...newProjectProps} />);
    const formEl = getByTestId('newproject_form');
    const nameInputEl = getByTestId('name_input');

    fireEvent.change(nameInputEl, {
        target: { value: 'This project name is for test purpose' }
    });

    expect(newProjectProps.startSetNewProject).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(newProjectProps.startSetNewProject).toHaveBeenCalledTimes(1);
});

test('Should fire startSetEditProject correctly', () => {
    const { getByTestId } = render(<NewProject {...{...newProjectProps, ...editProjectProps}} />);
    const formEl = getByTestId('newproject_form');
    const nameInputEl = getByTestId('name_input');

    fireEvent.change(nameInputEl, {
        target: { value: 'This project name is for test purpose' }
    });

    expect(editProjectProps.startSetEditProject).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(editProjectProps.startSetEditProject).toHaveBeenCalledTimes(1);
});