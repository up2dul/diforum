/**
 * test scenario
 *
 * - RegisterForm component
 *   - should handle confirm password to be same as password
 *   - should call submit function when Register button is clicked
 */

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { store } from '@/store';
import RegisterForm from './RegisterForm';

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

describe('RegisterForm component', () => {
  it('should handle confirm password to be same as password', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <Router>
          <RegisterForm />
        </Router>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm password');

    // Action
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('should call submit function when Register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(
      <Provider store={store}>
        <Router>
          <RegisterForm />
        </Router>
      </Provider>,
    );

    const fullNameInput = screen.getByLabelText('Full name') as HTMLInputElement;
    await userEvent.type(fullNameInput, 'John doe');

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    await userEvent.type(emailInput, 'test@gmail.com');

    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    await userEvent.type(passwordInput, 'password123');

    const confirmPasswordInput = screen.getByLabelText('Confirm password') as HTMLInputElement;
    await userEvent.type(confirmPasswordInput, 'password123');

    const registerButton = screen.getByRole('button', { name: 'Register' });

    mockRegister({
      fullName: fullNameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      confirmPassword: confirmPasswordInput.value,
    });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      fullName: 'John doe',
      email: 'test@gmail.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
  });
});
