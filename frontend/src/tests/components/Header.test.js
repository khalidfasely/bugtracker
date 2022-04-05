import React from "react";
import { render } from '@testing-library/react';
import { Header } from "../../components/Header";

test('Should render Header component correctly', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Header component with props correctly', () => {
    const props = {
        uname: 'User',
        startLogout: jest.fn(),
        startSetProjects: jest.fn()
    }
    const { asFragment } = render(<Header {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render h1 header with correct text', () => {
    const { getByTestId } = render(<Header />);
    const h1El = getByTestId('title_header');
    expect(h1El.textContent).toBe('Bug Tracker');
});