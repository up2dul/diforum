/**
 * test scenario
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call submit function when Log in button is clicked
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/store';
import LoginForm from './LoginForm';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

describe('LoginForm component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
        ,
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');

    // Action
    await userEvent.type(emailInput, 'test@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('test@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
        ,
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call submit function when Log in button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(
      <Provider store={store}>
        <Router>
          <LoginForm />
        </Router>
        ,
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    await userEvent.type(emailInput, 'test@gmail.com');
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    await userEvent.type(passwordInput, 'password123');
    const loginButton = screen.getByRole('button', { name: 'Log in' });

    mockLogin({
      email: emailInput.value,
      password: passwordInput.value,
    });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'test@gmail.com',
      password: 'password123',
    });
  });
});
