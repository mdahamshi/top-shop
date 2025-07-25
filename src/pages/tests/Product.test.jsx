import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Product, { loader } from '../Product';
import * as reactRouter from 'react-router-dom';
import * as cartContext from '../../context/CartContext';

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  image: 'test.jpg',
  description: 'Test description',
  rating: {
    rate: 4.5,
    count: 10,
  },
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
    Link: ({ children, ...props }) => <a {...props}>{children}</a>,
  };
});

vi.mock('../../context/CartContext', () => ({
  useCart: vi.fn(),
}));

describe('<Product />', () => {
  beforeEach(() => {
    reactRouter.useLoaderData.mockReturnValue({ product: mockProduct });

    cartContext.useCart.mockReturnValue({
      addItem: vi.fn(),
      totalItems: 1,
    });
  });

  it('renders product details and adds to cart', () => {
    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    // Check product details
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByText(/10 reviews/)).toBeInTheDocument();

    // Check Add to Cart button
    const addToCartBtn = screen.getByText(/Add to Cart/i);
    fireEvent.click(addToCartBtn);

    // Success message
    expect(screen.getByText(/Item added successfully/i)).toBeInTheDocument();

    // Go to checkout link
    expect(screen.getByText(/Go to checkout/i)).toBeInTheDocument();
  });
});
