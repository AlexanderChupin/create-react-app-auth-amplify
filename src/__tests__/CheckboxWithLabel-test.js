// __tests__/CheckboxWithLabel-test.js
// ALC https://jestjs.io/docs/en/24.x/tutorial-react

import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import CheckboxWithLabel from '../CheckboxWithLabel';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
    const {queryByLabelText, getByLabelText} = render(
        <CheckboxWithLabel labelOn="On" labelOff="Off" />,
    );

    expect(queryByLabelText(/off/i)).toBeTruthy();
    screen.debug()
    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
    screen.debug()
});