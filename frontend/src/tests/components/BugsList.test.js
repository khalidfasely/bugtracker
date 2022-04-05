import React from "react";
import { render } from '@testing-library/react';

import BugsList from "../../components/BugsList";
import bug from '../fixtures/bug';

test('Should render BugsList component without bug data', () => {
    const { asFragment } = render(<BugsList />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render BugsList component with bug data', () => {
    const { asFragment } = render(<BugsList bug={bug} />);
    expect(asFragment()).toMatchSnapshot();
});