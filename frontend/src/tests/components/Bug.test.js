import React from "react";
import { render, act } from '@testing-library/react';
import { Bug } from "../../components/Bug";
jest.mock('../../components/BugItem', () => () => <div>BugItem</div>);

test('Should render Bug component correctly', async () => {
    //const result = { message: "message" }
    const promise = Promise.resolve({});
    const props = {
        //startSetBug: jest.fn()
        // mock a async function
        startSetBug: jest.fn(() => promise)
        //startSetBug: jest.fn().mockImplementation(() => Promise.resolve(result))
    }
    const { asFragment } = render(<Bug {...props} />);
    expect(asFragment()).toMatchSnapshot();
    await act(() => promise);
});

test('Should render Bug component correctly after waiting the bug to come from backend', async () => {
    const promise = Promise.resolve({});
    const props = {
        startSetBug: jest.fn(() => promise)
    }
    const { asFragment } = render(<Bug {...props} />);
    await act(() => promise);
    expect(asFragment()).toMatchSnapshot();
});