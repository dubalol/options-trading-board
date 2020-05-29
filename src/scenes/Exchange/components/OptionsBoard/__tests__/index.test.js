/**
 * See: https://testing-library.com/docs/example-react-redux
 * 
 */
import '@testing-library/jest-dom'
import "babel-polyfill"
import React from 'react'

import { render } from '../../../test-utils';
import { screen, fireEvent } from '@testing-library/react'
import OptionsBoard from '..';

test('it renders the Spinner if contract data is not set yet', () => {
  const { getByTestId } = render(<OptionsBoard />);
  const spinner = getByTestId('spinner');
  expect(spinner).toBeTruthy();
})
