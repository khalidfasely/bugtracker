import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import { NewBug } from "../../components/NewBug";
import bug from '../fixtures/bug';

let newBugProps, editBugProps;

beforeEach(() => {
    newBugProps = {
        uname: 'admin',
        users: ['admin', '1'],
        on_project: 5,
        startSetNewBug: jest.fn(() => Promise.resolve({}))
    }
    editBugProps = {
        isEdit: true,
        bug,
        setEditModalOpen: jest.fn(),
        startSetEditBug: jest.fn(() => Promise.resolve())
    }
});

test('Should render NewBug component without prop', () => {
    const { asFragment } = render(<NewBug />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewBug component with new bug prop', () => {
    const { asFragment } = render(<NewBug {...newBugProps} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewBug component with new bug prop', () => {
    const { asFragment } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should change title input value in new bug', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const titleInputEl = getByTestId("title_input");

    expect(titleInputEl.value).toBe('');

    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });

    expect(titleInputEl.value).toBe('title');
});

test('Should change description textarea value in new bug', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const descriptionInputEl = getByTestId("description_input");

    expect(descriptionInputEl.value).toBe('');

    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });

    expect(descriptionInputEl.value).toBe('description');
});

test('Should change active checkbox value in new bug', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const activeCheckboxEl = getByTestId("active_checkbox");

    expect(activeCheckboxEl.checked).toBe(true);

    fireEvent.change(activeCheckboxEl, {
        target: {
            checked: false
        }
    });

    expect(activeCheckboxEl.checked).toBe(false);
});

test('Should change classification radio value in new bug', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const highRadioEl = getByTestId("high_radio");
    const mediumRadioEl = getByTestId("medium_radio");
    const lowRadioEl = getByTestId("low_radio");

    expect(highRadioEl.checked).toBe(true);
    expect(mediumRadioEl.checked).toBe(false);
    expect(lowRadioEl.checked).toBe(false);

    fireEvent.change(mediumRadioEl, {
        target: {
            checked: true
        }
    });

    expect(highRadioEl.checked).toBe(false);
    expect(mediumRadioEl.checked).toBe(true);
    expect(lowRadioEl.checked).toBe(false);

    fireEvent.change(lowRadioEl, {
        target: {
            checked: true
        }
    });

    expect(highRadioEl.checked).toBe(false);
    expect(mediumRadioEl.checked).toBe(false);
    expect(lowRadioEl.checked).toBe(true);
});

test('Should change title input value in edit bug', () => {
    const { getByTestId } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    const titleInputEl = getByTestId("title_input");

    expect(titleInputEl.value).toBe(bug.title);

    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });

    expect(titleInputEl.value).toBe('title');
});

test('Should change description textarea value in edit bug', () => {
    const { getByTestId } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    const descriptionInputEl = getByTestId("description_input");

    expect(descriptionInputEl.value).toBe(bug.description);

    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });

    expect(descriptionInputEl.value).toBe('description');
});

test('Should change active checkbox value in edit bug', () => {
    const { getByTestId } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    const activeCheckboxEl = getByTestId("active_checkbox");

    expect(activeCheckboxEl.checked).toBe(true);

    fireEvent.change(activeCheckboxEl, {
        target: {
            checked: false
        }
    });

    expect(activeCheckboxEl.checked).toBe(false);

    fireEvent.change(activeCheckboxEl, {
        target: {
            checked: true
        }
    });

    expect(activeCheckboxEl.checked).toBe(true);
});

test('Should change classification radio value in edit bug', () => {
    const { getByTestId } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    const highRadioEl = getByTestId("high_radio");
    const mediumRadioEl = getByTestId("medium_radio");
    const lowRadioEl = getByTestId("low_radio");

    expect(highRadioEl.checked).toBe(false);
    expect(mediumRadioEl.checked).toBe(true);
    expect(lowRadioEl.checked).toBe(false);

    fireEvent.change(lowRadioEl, {
        target: {
            checked: true
        }
    });

    expect(highRadioEl.checked).toBe(false);
    expect(mediumRadioEl.checked).toBe(false);
    expect(lowRadioEl.checked).toBe(true);

    fireEvent.change(highRadioEl, {
        target: {
            checked: true
        }
    });

    expect(highRadioEl.checked).toBe(true);
    expect(mediumRadioEl.checked).toBe(false);
    expect(lowRadioEl.checked).toBe(false);
});

test('Should display title\'s error if title length < 15', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const formEl = getByTestId('newbug_form');
    const titleInputEl = getByTestId("title_input");
    const titleErrorEl = getByTestId('title_error');

    expect(titleErrorEl.textContent).toBe('');

    fireEvent.change(titleInputEl, {
        target: {
            value: 'title'
        }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(titleErrorEl.textContent).toBe('Title must be 15 character or more');

    fireEvent.change(titleInputEl, {
        target: {
            value: 'long title for the error to be gone!'
        }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(titleErrorEl.textContent).toBe('');
});

test('Should display description\'s error if description length < 120', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const formEl = getByTestId('newbug_form');
    const descriptionInputEl = getByTestId("description_input");
    const descriptionErrorEl = getByTestId('description_error');

    expect(descriptionErrorEl.textContent).toBe('');

    fireEvent.change(descriptionInputEl, {
        target: {
            value: 'description'
        }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(descriptionErrorEl.textContent).toBe('Description must be 120 character or more');

    fireEvent.change(descriptionInputEl, {
        target: {
            value: `
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
            `
        }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(descriptionErrorEl.textContent).toBe('');
});

test('Should fire form submit correctly in new bug', () => {
    const { getByTestId } = render(<NewBug {...newBugProps} />);
    const formEl = getByTestId('newbug_form');
    const titleInputEl = getByTestId("title_input");
    const descriptionInputEl = getByTestId("description_input");

    fireEvent.change(titleInputEl, {
        target: {
            value: 'long title for the error to be gone!'
        }
    });

    fireEvent.change(descriptionInputEl, {
        target: {
            value: `
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
            `
        }
    });

    expect(newBugProps.startSetNewBug).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(newBugProps.startSetNewBug).toHaveBeenCalledTimes(1);
});

test('Should fire form submit correctly in edit bug', () => {
    const { getByTestId } = render(<NewBug {...{...newBugProps, ...editBugProps}} />);
    const formEl = getByTestId('newbug_form');
    const titleInputEl = getByTestId("title_input");
    const descriptionInputEl = getByTestId("description_input");

    fireEvent.change(titleInputEl, {
        target: {
            value: 'long title for the error to be gone!'
        }
    });

    fireEvent.change(descriptionInputEl, {
        target: {
            value: `
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
                long description for the error to be gone!
            `
        }
    });

    expect(editBugProps.startSetEditBug).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(editBugProps.startSetEditBug).toHaveBeenCalledTimes(1);
});