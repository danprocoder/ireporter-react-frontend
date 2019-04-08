import React from 'react';
import { cleanup, render } from 'react-testing-library';
import LoadingButton from '../../src/components/LoadingButton.jsx';

afterEach(cleanup);

describe('Test loading button component', () => {
  const { getByText, queryByLabelText, rerender } = render(<LoadingButton value="Click Me!" />);

  test('It should contain certain texts', () => {
    getByText(/Click Me!/);
  });

  test('It should contain ... after being rendered with prop loading=true', () => {
    rerender(<LoadingButton value="Click Me!" loading />);
    queryByLabelText(/Click Me!/);
    queryByLabelText(/.../);
  });
});
