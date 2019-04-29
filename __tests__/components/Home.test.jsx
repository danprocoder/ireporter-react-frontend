import { render, cleanup } from 'react-testing-library';
import React from 'react';
import Home from '../../src/components/Home';

afterEach(cleanup);

describe('Test homepage component', () => {
  test('It should have certain texts', () => {
    const { getByText } = render(<Home />);

    getByText('WELCOME TO IREPORTER');
    getByText('Bring any form of corruption to the notice of appropriate authorities and the general public. Also report on things that needs government intervention.');
    getByText('Bribery, looted money, etc.');
    getByText('Bad roads, electricity issues, etc.');
  });
});
