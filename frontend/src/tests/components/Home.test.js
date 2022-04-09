import React from 'react';
import { render } from '@testing-library/react';

import { Home } from '../../components/Home';

test('Should render Home component correctly without props', () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
});

test('Should render Home component correctly with uname', () => {
    const { asFragment } = render(<Home uname='user' />);
    expect(asFragment()).toMatchSnapshot();
});