import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutPage from '../CheckoutPage';
import { MemoryRouter } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { vi, describe, beforeEach, test, expect } from 'vitest';

// Mock useCart hook
vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  // Import the actual module to keep everything else intact
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CheckoutPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('shows empty cart message when no items', () => {
    useCart.mockReturnValue({
      items: [],
      totalPrice: 0,
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /back to shop/i })
    ).toBeInTheDocument();
  });

  test('renders checkout form and order summary', () => {
    useCart.mockReturnValue({
      items: [
        { id: 1, title: 'Lamp', quantity: 2, price: 10.5 },
        { id: 2, title: 'Chair', quantity: 1, price: 50 },
      ],
      totalPrice: 71,
      clearCart: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();

    expect(screen.getByText(/lamp × 2 = \$21\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/chair × 1 = \$50\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/total: \$71\.00/i)).toBeInTheDocument();
  });

  test('submits form and clears cart, then navigates', async () => {
    const clearCart = vi.fn();
    useCart.mockReturnValue({
      items: [{ id: 1, title: 'Lamp', quantity: 2, price: 10 }],
      totalPrice: 20,
      clearCart,
    });

    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <CheckoutPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/address/i), '123 Street');

    await userEvent.click(screen.getByRole('button', { name: /place order/i }));

    expect(window.alert).toHaveBeenCalledWith('Order placed successfully!');
    expect(clearCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/shop');
  });
});
