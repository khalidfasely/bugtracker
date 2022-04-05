import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import CommentDelModal from '../../components/CommentDelModal';

let props;

beforeEach(() => {
    props = {
        delModalOpen: true,
        setDelModalOpen: jest.fn(),
        deleteComment: jest.fn()
    }
});

test('Should render CommentDelModal correctly', () => {
    const { asFragment } = render(<CommentDelModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should delete button fire correctly', () => {
    const { getByTestId } = render(<CommentDelModal {...props} />);
    const buttonDelEl = getByTestId('delete_button');

    expect(props.deleteComment).toHaveBeenCalledTimes(0);

    fireEvent.click(buttonDelEl);

    expect(props.deleteComment).toHaveBeenCalledTimes(1);
});