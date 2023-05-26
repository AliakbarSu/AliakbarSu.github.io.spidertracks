import { render, screen, fireEvent } from '@testing-library/react';
import Customers from './Customer';
import { Customer, CustomerStatusEnum } from 'types/Customer';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('hooks/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}));
vi.mock('store/customer', () => ({
    updateCustomerStatus: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
    Link: (props: any) => <div {...props}>{props.children}</div>,
}))


// Mock ResizeObserver as it's throwing an error in tests
window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
    }));

describe('Customers component', () => {
    const customer: Customer = {
        id: "firstCustomer",
        email: 'test@example.com',
        name: 'John Doe',
        status: CustomerStatusEnum.active,
        opportunities: [],
        created_at: "12/20/2023"
    };

    beforeEach(() => {
        render(<Customers customer={customer} />);
    });

    it('Should render customer name and email', () => {
        const nameElement = screen.getByText('John Doe');
        const emailElement = screen.getByText('test@example.com');
        expect(nameElement).toBeDefined();
        expect(emailElement).toBeDefined();
    });

    it('Should render customer status', () => {
        const statusElement = screen.getByText('Active');
        expect(statusElement).toBeDefined();
    });

    it('Should open the status modal when clicking on the update status link', () => {
        const menuBtn = screen.getByText('Open options');
        fireEvent.click(menuBtn);
        const updateStatusLink = screen.getByText('Update Status');
        fireEvent.click(updateStatusLink);
        const modalElement = screen.getByTestId('statusModal');
        expect(modalElement).toBeDefined();
    });

    it('Should open the opportunities component when clicking on a customer', () => {
        const customerField = screen.getByText(customer.email);
        fireEvent.click(customerField);
        const opportunitiesComponent = screen.getByTestId('opportunities-component');
        expect(opportunitiesComponent).toBeDefined();
    });
});
