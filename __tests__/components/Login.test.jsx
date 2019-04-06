import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Login from '../../src/components/Login.jsx';

afterEach(cleanup);

describe('Test <Login /> component', () => {
  const { getByText } = render(<Login />);

  test('It should have certain texts', () => {
    getByText(/log in/i);
    getByText('Your Email');
    getByText('Your Password');
  });
});
