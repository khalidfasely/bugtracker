import React from "react";
import { render } from '@testing-library/react';
import NotFound from '../../components/NotFound';

test('Should render NotFound component correctly', () => {
    const { asFragment } = render(<NotFound />);
    expect(asFragment()).toMatchSnapshot();
});