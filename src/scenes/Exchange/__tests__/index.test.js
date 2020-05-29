/**
 * See: https://testing-library.com/docs/example-react-redux
 * 
 */
import '@testing-library/jest-dom'
import "babel-polyfill"
import React from 'react'

import { render } from '../test-utils';
import { screen, fireEvent } from '@testing-library/react'
import Exchange from '..';

test('it renders the Exchange with default values', () => {
  render(<Exchange />);

  expect(screen.getByText("Portfolio Bar")).toBeInTheDocument();
  expect(screen.getByText("Default Content")).toBeInTheDocument();
  expect(screen.getByText("Default Graph")).toBeInTheDocument();
  expect(screen.getByText("Chat")).toBeInTheDocument();

  expect(screen.queryByText("Put Contracts")).toBeNull();
  expect(screen.queryByText("Call Contracts")).toBeNull();
})
