import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('should button render label text', () => {
  const label = 'Sample Text';
  const onClickMock = jest.fn();

  render(<Button label={label} onClick={onClickMock} />);

  const el = screen.getByText(label);
  expect(el).toBeInTheDocument();

  el.click();
  expect(onClickMock).toBeCalledTimes(1);
});

test('should button trigger onClick', () => {
  const label = 'Sample Text';
  const onClickMock = jest.fn();

  render(<Button label={label} onClick={onClickMock} />);

  const el = screen.getByText(label);
  el.click();
  expect(onClickMock).toBeCalledTimes(1);
});
