import React from "react";
import { render } from "@testing-library/react";

import { ProjectItem } from "../../components/ProjectItem";
import project from '../fixtures/project';
import bug from '../fixtures/bug';

jest.mock('../../components/ProjectDelModal', () => () => <div>ProjectDelModal</div>);
jest.mock('../../components/ProjectEditModal', () => () => <div>ProjectEditModal</div>);
jest.mock('../../components/NewBug', () => () => <div>NewBug</div>);
//jest.mock('../../components/BugsList', () => () => <div>BugsList</div>);

let props;

beforeEach(() => {//uname, projectItem, bugs, startSetDelProject
    props = {
        uname: 'User',
        projectItem: project,
        bugs: [bug],
        startSetDelProject: jest.fn(() => Promise.resolve())
    }
});

test('Should render ProjectItem component correctly with uname not in the project', () => {
    const { asFragment } = render(<ProjectItem {...props} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render ProjectItem component correctly with uname in the project', () => {
    const { asFragment } = render(<ProjectItem {...{...props, uname: 'admin'}} />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render ProjectItem component correctly with uname === project.user', () => {
    const { asFragment } = render(<ProjectItem {...{...props, uname: project.user.username}} />);
    expect(asFragment()).toMatchSnapshot();
});