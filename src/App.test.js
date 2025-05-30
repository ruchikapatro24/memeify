// Memeify Custom Test Suite - Ensuring UI renders as expected

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Memeify header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Memeify/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders meme image button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Get a new meme image/i);
  expect(buttonElement).toBeInTheDocument();
});
