import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store';
import App from './App';

test('Add photo modal is opened on clicking on add photo', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const button = getByText("Add Photo");
  fireEvent.click(button);
  // Expect Add Photo modal
  expect(getByText("Add a new photo")).toBeInTheDocument();
});