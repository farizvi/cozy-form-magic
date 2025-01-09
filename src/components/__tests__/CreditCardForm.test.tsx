import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreditCardForm } from '../CreditCardForm';
import { useForm } from 'react-hook-form';
import { vi } from 'vitest';
import '@testing-library/jest-dom';

const TestWrapper = () => {
  const form = useForm({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
  });

  return <CreditCardForm control={form.control} />;
};

describe('CreditCardForm', () => {
  it('renders all credit card form fields', () => {
    render(<TestWrapper />);
    
    expect(screen.getByLabelText(/card number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/expiry date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
  });

  it('formats card number correctly', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const cardNumberInput = screen.getByLabelText(/card number/i);
    await user.type(cardNumberInput, '4111111111111111');
    
    expect(cardNumberInput).toHaveValue('4111 1111 1111 1111');
  });

  it('limits CVV to 3 digits', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const cvvInput = screen.getByLabelText(/cvv/i);
    await user.type(cvvInput, '12345');
    
    expect(cvvInput).toHaveValue('123');
  });

  it('accepts valid expiry date format', async () => {
    render(<TestWrapper />);
    const user = userEvent.setup();
    
    const expiryInput = screen.getByLabelText(/expiry date/i);
    await user.type(expiryInput, '1224');
    
    expect(expiryInput).toHaveValue('12/24');
  });
});