import React from 'react';
import { render, screen } from '@testing-library/react';
import APIError from './APIError';
import TestWrapper from '../../Utils/TestWrapper';

const INITIAL_STATE = {
  apiError: {
    message: 'Some error message'
  }
};
test('should render error message', () => {
  render(TestWrapper(
    <APIError />,
    INITIAL_STATE
  ));
  const message = screen.getByText(INITIAL_STATE.apiError.message);
  expect(message).toBeInTheDocument();
});
