import React from "react";
import { render } from "@testing-library/react";

import bug from "../fixtures/bug";
import BugData from "../../components/BugData";

test('Should render BugData component correctly without bug data', () => {
    const { asFragment } = render(<BugData />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BugData component correctly with bug data', () => {
    const props = {
        bug
    }
    const { asFragment } = render(<BugData {...props} />);
    expect(asFragment()).toMatchSnapshot();
});