import React from "react";
import { render } from "@testing-library/react";

import { BugItem } from "../../components/BugItem";
import bug from '../fixtures/bug';
import comments from '../fixtures/comments';

jest.mock('../../components/BugDelModal', () => () => <div>BugDelModal</div>);
jest.mock('../../components/BugEditModal', () => () => <div>BugEditModal</div>);
jest.mock('../../components/NewComment', () => () => <div>NewComment</div>);
jest.mock('../../components/Comment', () => () => <div>Comment</div>);

let props;

beforeEach(() => {
    props = {
        uname: 'User',
        bug,
        comments,
        startSetDeleteBug: jest.fn(() => Promise.resolve()),
        startSetSelectUsers: jest.fn()
    }
});

test('Should render BugItem component correctly with uname not in the bug', () => {
    const { asFragment } = render(<BugItem {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BugItem component correctly with uname in the bug', () => {
    const { asFragment } = render(<BugItem {...{...props, uname: '1'}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BugItem component correctly with uname === bug.user', () => {
    const { asFragment } = render(<BugItem {...{...props, uname: bug.user.username}} />);
    expect(asFragment()).toMatchSnapshot();
});