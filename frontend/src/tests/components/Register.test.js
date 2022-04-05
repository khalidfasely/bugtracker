import React from 'react';
import { Register } from '../../components/Register';
import { render, fireEvent, act } from '@testing-library/react';

test('Should render Register component correctly', () => {
    const { asFragment } = render(<Register />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render button with correct text', () => {
    const { getByTestId } = render(<Register />);
    const buttonEl = getByTestId('register_button');
    expect(buttonEl.textContent).toBe('Register');
});

test('Should change username input value', () => {
    const { getByTestId } = render(<Register />);
    const usernameInputEl = getByTestId('username_input');

    expect(usernameInputEl.value).toBe('');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    expect(usernameInputEl.value).toBe('Username');
});

test('Should change email input value', () => {
    const { getByTestId } = render(<Register />);
    const emailInputEl = getByTestId('email_input');

    expect(emailInputEl.value).toBe('');

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    expect(emailInputEl.value).toBe('Email@test');
});

test('Should change password input value', () => {
    const { getByTestId } = render(<Register />);
    const passwordInputEl = getByTestId('password_input');

    expect(passwordInputEl.value).toBe('');

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    expect(passwordInputEl.value).toBe('Password');
});

test('Should change confirmation input value', () => {
    const { getByTestId } = render(<Register />);
    const confirmationInputEl = getByTestId('confirmation_input');

    expect(confirmationInputEl.value).toBe('');

    fireEvent.change(confirmationInputEl, {
        target: {
            value: 'Confirmation'
        }
    });

    expect(confirmationInputEl.value).toBe('Confirmation');
});

test('Should not submit the form with empty inputs', () => {
    const { getByTestId } = render(<Register />);
    const formEl = getByTestId('register_form');

    fireEvent.submit(formEl);

    const errorEl = getByTestId('register_error');

    expect(errorEl.textContent).toBe('Must set all fields!');
});

test('Should not submit the form with one empty input', () => {
    const { getByTestId } = render(<Register />);
    const formEl = getByTestId('register_form');

    const usernameInputEl = getByTestId('username_input');
    const emailInputEl = getByTestId('email_input');
    const passwordInputEl = getByTestId('password_input');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    fireEvent.submit(formEl);

    const errorEl = getByTestId('register_error');

    expect(errorEl.textContent).toBe('Must set all fields!');
});

test('Should not submit the form if password and confirmation does not matchs', () => {
    const { getByTestId } = render(<Register />);
    const formEl = getByTestId('register_form');

    const usernameInputEl = getByTestId('username_input');
    const emailInputEl = getByTestId('email_input');
    const passwordInputEl = getByTestId('password_input');
    const confirmationInputEl = getByTestId('confirmation_input');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@test'
        }
    });

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    fireEvent.change(confirmationInputEl, {
        target: {
            value: 'AnotherPassword'
        }
    });

    fireEvent.submit(formEl);

    const errorEl = getByTestId('register_error');

    expect(errorEl.textContent).toBe('Password and Confirmation must match!');
});

test('Should submit form with full inputs', async () => {
    const promise = Promise.resolve({});
    const startRegister = jest.fn(() => promise);

    const { getByTestId } = render(<Register startRegister={startRegister} />);
    const formEl = getByTestId("register_form");

    const usernameInputEl = getByTestId("username_input");
    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    const emailInputEl = getByTestId("email_input");
    fireEvent.change(emailInputEl, {
        target: {
            value: 'Email@o.com'
        }
    });

    const passwordInputEl = getByTestId("password_input");
    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    const confirmationInputEl = getByTestId("confirmation_input");
    fireEvent.change(confirmationInputEl, {
        target: {
            value: 'Password'
        }
    });

    expect(startRegister).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    await act(() => promise);
    expect(startRegister).toHaveBeenCalledTimes(1);
});