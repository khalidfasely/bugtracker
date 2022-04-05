import React from "react";
import { render } from "@testing-library/react";

import ProjectData from "../../components/ProjectData";
import project from "../fixtures/project";

test('Should render ProjectData component without props', () => {
    const { asFragment } = render(<ProjectData />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render ProjectData component with props', () => {
    const { asFragment } = render(<ProjectData projectItem={project} />);
    expect(asFragment()).toMatchSnapshot();
});