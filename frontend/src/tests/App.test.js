import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

test('renders learn react link', () => {
  render(<App />);

  expect(screen.getByText('Welcome to the React App')).toBeInTheDocument();
  expect(screen.getByText('This is a simple React application.')).toBeInTheDocument();
});
