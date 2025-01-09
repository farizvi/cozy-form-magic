import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BankAccountForm } from '../BankAccountForm';
import { useForm } from 'react-hook-form';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const TestWrapper = () => {
  const form = useForm({
    defaultValues: {
      accountName: '',
      bsb: '',
      accountNumber: '',
    },
  });

  return <BankAccountForm control={form.control} />;
};

describe('BankAccountForm', () => {
  it('renders all bank account form fields', () => {
    render(<TestWrapper />);
    
    expect(screen.getByLabelText(/account name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bsb/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/account number/i)).toBeInTheDocument();
  });

  it('formats BSB correctly', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const bsbInput = screen.getByLabelText(/bsb/i);
    await user.type(bsbInput, '123456');
    
    expect(bsbInput).toHaveValue('123-456');
  });

  it('accepts valid account name', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const accountNameInput = screen.getByLabelText(/account name/i);
    await user.type(accountNameInput, 'John Doe');
    
    expect(accountNameInput).toHaveValue('John Doe');
  });

  it('accepts valid account number', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const accountNumberInput = screen.getByLabelText(/account number/i);
    await user.type(accountNumberInput, '12345678');
    
    expect(accountNumberInput).toHaveValue('12345678');
  });
});