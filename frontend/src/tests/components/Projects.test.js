import React from "react";
import { render } from "@testing-library/react";

import { Projects } from "../../components/Projects";
import projects from "../fixtures/projects";

let props;

beforeEach(() => {
    props = {
        uname: 'admin',
        projects: [projects[1]]
    }
});

test('Should render Projects component without props', () => {
    const { asFragment } = render(<Projects />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Projects component with props', () => {
    const { asFragment } = render(<Projects {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Projects component with projects empty array', () => {
    const { asFragment } = render(<Projects {...{...props, projects: []}} />);
    expect(asFragment()).toMatchSnapshot();
});