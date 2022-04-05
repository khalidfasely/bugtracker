import React from "react";
import { render, fireEvent } from '@testing-library/react';

import { NewComment } from "../../components/NewComment";

let newCommentProps, editCommentProps;

beforeEach(() => {
    newCommentProps = {
        bugId: 1,
        uname: 'admin',
        startSetNewComment: jest.fn(() => Promise.resolve())
    }
    editCommentProps = {
        commentEdit: 'You can fix this bug by adding a default value!',
        commentId: 1,
        setIsEdit: jest.fn(),
        startSetEditComment: jest.fn(() => Promise.resolve())
    }
});

test('Should render NewComment component correctly without props', () => {
    const { asFragment } = render(<NewComment />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewComment component correctly with props to new comment', () => {
    const { asFragment } = render(<NewComment {...newCommentProps} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render NewComment component correctly with props to edit comment', () => {
    const { asFragment } = render(<NewComment {...{...newCommentProps, ...editCommentProps}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should change comment input correctly in new comment', () => {
    const { getByTestId } = render(<NewComment {...newCommentProps} />);
    const commentInputEl = getByTestId('comment_input');

    expect(commentInputEl.value).toBe('');

    fireEvent.change(commentInputEl, {
        target: { value: 'New comment!' }
    });

    expect(commentInputEl.value).toBe('New comment!')
});

test('Should change comment input correctly in edit comment', () => {
    const { getByTestId } = render(<NewComment {...{...newCommentProps, ...editCommentProps}} />);
    const commentInputEl = getByTestId('comment_input');

    expect(commentInputEl.value).toBe(editCommentProps.commentEdit);

    fireEvent.change(commentInputEl, {
        target: { value: 'New comment!' }
    });

    expect(commentInputEl.value).toBe('New comment!')
});

test('Should display an error if comment length < 15', () => {
    const { getByTestId } = render(<NewComment {...newCommentProps} />);
    const formEl = getByTestId('comment_form');
    const commentInputEl = getByTestId('comment_input');
    const errorEl = getByTestId('comment_error');

    expect(errorEl.textContent).toBe('');

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(errorEl.textContent).toBe('Comment must be 15 character or more!');

    fireEvent.change(commentInputEl, {
        target: { value: 'New comment for erro to gone!' }
    });

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(errorEl.textContent).toBe('');
});

test('Should fire startSetNewComment correctly on form submit', () => {
    const { getByTestId } = render(<NewComment {...newCommentProps} />);
    const formEl = getByTestId('comment_form');
    const commentInputEl = getByTestId('comment_input');

    fireEvent.change(commentInputEl, {
        target: { value: 'You can fix this bug by adding a default value!' }
    });

    expect(newCommentProps.startSetNewComment).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(newCommentProps.startSetNewComment).toHaveBeenCalledTimes(1);
});

test('Should fire startSetEditComment correctly on form submit', () => {
    const { getByTestId } = render(<NewComment {...{...newCommentProps, ...editCommentProps}} />);
    const formEl = getByTestId('comment_form');

    expect(editCommentProps.startSetEditComment).toHaveBeenCalledTimes(0);

    fireEvent.submit(formEl, {
        preventDefault: () => {}
    });

    expect(editCommentProps.startSetEditComment).toHaveBeenCalledTimes(1);
});