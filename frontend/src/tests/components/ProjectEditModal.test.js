import React from "react";
import { render } from "@testing-library/react";

import ProjectEditModal from "../../components/ProjectEditModal";

jest.mock('../../components/NewProject', () => () => <div>NewProject</div>);

let props;

beforeEach(() => {
    props = {
        editModalOpen: true,
        setEditModalOpen: jest.fn()
    };
});

test('Should render ProjectEditModal component correctly', () => {
    const { asFragment } = render(<ProjectEditModal {...props} />);
    expect(asFragment()).toMatchSnapshot();
});