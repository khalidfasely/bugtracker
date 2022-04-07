import React from "react";
import { render } from "@testing-library/react";

import Loading from "../../components/Loading";

test('Should render Loading component correctly', () => {
    const { asFragment } = render(<Loading />);
    expect(asFragment()).toMatchSnapshot();
});