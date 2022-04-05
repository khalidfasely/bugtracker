import React from "react";
import { render, act } from '@testing-library/react';

import { Project } from "../../components/Project";

jest.mock('../../components/ProjectItem', () => () => <div>ProjectItem</div>);

test('Should render Project component correctly', async () => {
    const promise = Promise.resolve({});
    const props = {
        // mock a async function
        startSetProject: jest.fn(() => promise)
    }
    const { asFragment } = render(<Project {...props} />);
    expect(asFragment()).toMatchSnapshot();
    await act(() => promise);
});

test('Should render Project component correctly after waiting the project to come from backend', async () => {
    const promise = Promise.resolve({});
    const props = {
        startSetProject: jest.fn(() => promise)
    }
    const { asFragment } = render(<Project {...props} />);
    await act(() => promise);
    expect(asFragment()).toMatchSnapshot();
});