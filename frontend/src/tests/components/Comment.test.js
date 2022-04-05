import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Comment } from '../../components/Comment';
import comments from "../fixtures/comments";

jest.mock('../../components/CommentDelModal', () => () => <div>CommentDelModal</div>);
jest.mock('../../components/NewComment', () => () => <div>NewComment</div>);

let props;

beforeEach(() => {
    props = {
        comment: comments[0],
        uname: '1',
        startSetDeleteComment: jest.fn(() => Promise.resolve())
    }
});

test('Should render Comment component correctly with user not the comment creator', () => {
    const { asFragment } = render(<Comment {...{...props, uname: 'Anonymous'}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Comment component correctly with user is the comment creator', () => {
    const { asFragment } = render(<Comment {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should edit button fire correctly', () => {
    const { asFragment, getByTestId } = render(<Comment {...props} />);
    const buttonEditEl = getByTestId('edit_button');

    fireEvent.click(buttonEditEl);

    expect(asFragment()).toMatchSnapshot();
});