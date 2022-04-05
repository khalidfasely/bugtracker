import React from "react";
import { render, fireEvent, act } from "@testing-library/react";

import { Login } from "../../components/Login";

let startLogin;

beforeEach(() => {
    startLogin = jest.fn(() => Promise.resolve({}));
});

test('Should render Login component correctly', () => {
    const { asFragment } = render(<Login />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Login button correctly', () => {
    const { getByTestId } = render(<Login startLogin={startLogin} />);
    const buttonEl = getByTestId("login_button");
    expect(buttonEl.textContent).toBe('Login');
});

test('Should change username input value', () => {
    const { getByTestId } = render(<Login startLogin={startLogin} />);
    const usernameInputEl = getByTestId("username_input");

    expect(usernameInputEl.value).toBe('');

    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    expect(usernameInputEl.value).toBe('Username');
});

test('Should change password input value', () => {
    const { getByTestId } = render(<Login startLogin={startLogin} />);
    const passwordInputEl = getByTestId("password_input");

    expect(passwordInputEl.value).toBe('');

    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    expect(passwordInputEl.value).toBe('Password');
});

test('Should not submit form with empty inputs', () => {
    const { getByTestId } = render(<Login startLogin={startLogin} />);
    const formEl = getByTestId("login_form");

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    const errorEl = getByTestId("error_message");
    expect(errorEl.textContent).toBe('Must set all fields!');
});

test('Should submit form with full inputs', async () => {
    const promise = Promise.resolve({});
    const startLoginIn = jest.fn(() => promise);

    const { getByTestId } = render(<Login startLogin={startLoginIn} />);
    const formEl = getByTestId("login_form");

    const passwordInputEl = getByTestId("password_input");
    fireEvent.change(passwordInputEl, {
        target: {
            value: 'Password'
        }
    });

    const usernameInputEl = getByTestId("username_input");
    fireEvent.change(usernameInputEl, {
        target: {
            value: 'Username'
        }
    });

    expect(startLoginIn).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    await act(() => promise);
    expect(startLoginIn).toHaveBeenCalledTimes(1);
});