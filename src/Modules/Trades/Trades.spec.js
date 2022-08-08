import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import strings from '../../Translations/en';

const selectors = {
  appHeaderText: 'app-header'
};
test('should render header text', () => {
  render(<Header />);
  const el = screen.getByTestId(selectors.appHeaderText);
  expect(el).toBeInTheDocument();
  expect(el).toHaveTextContent(strings.header);
});
