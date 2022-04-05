import React from "react";
import { render, fireEvent } from "@testing-library/react";

import BugEditModal from "../../components/BugEditModal";

jest.mock('../../components/NewBug', () => () => <div>NewBug</div>);

let props;

beforeEach(() => {//editModalOpen, setEditModalOpen,
    props = {
        editModalOpen: true,
        setEditModalOpen: jest.fn()
    };
});

test('Should render BugEditModal component correctly', () => {
    const { asFragment } = render(<BugEditModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
});