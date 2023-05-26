import { render, screen, fireEvent } from "@testing-library/react";
import StatusModal from "./StatusModal";
import { CustomerStatusEnum } from "types/Customer";
import { vi, describe, it, expect } from "vitest"

const mockOnUpdate = vi.fn();
const mockOnClose = vi.fn();

const mockStatus = CustomerStatusEnum.active;

vi.mock('hooks/store', () => ({
    useAppSelector: vi.fn(),
}));

// Mock ResizeObserver as it's throwing an error in tests
window.ResizeObserver =
    window.ResizeObserver ||
    vi.fn().mockImplementation(() => ({
        disconnect: vi.fn(),
        observe: vi.fn(),
        unobserve: vi.fn(),
    }));

describe("StatusModal", () => {
    it("Should render correctly with available status options", () => {
        render(
            <StatusModal
                open={true}
                onUpdate={mockOnUpdate}
                onClose={mockOnClose}
                status={mockStatus}
            />
        );

        const activeStatusOption = screen.getByLabelText("Active");
        expect(activeStatusOption).toBeDefined();

        const inactiveStatusOption = screen.getByLabelText("Inactive");
        expect(inactiveStatusOption).toBeDefined();

        const leadStatusOption = screen.getByLabelText("Lead");
        expect(leadStatusOption).toBeDefined();
    });

    it("Should call onUpdate with the selected status when 'Update' button is clicked", () => {
        render(
            <StatusModal
                open={true}
                onUpdate={mockOnUpdate}
                onClose={mockOnClose}
                status={mockStatus}
            />
        );

        const inactiveStatusOption = screen.getByLabelText("Inactive");
        fireEvent.click(inactiveStatusOption);

        const updateButton = screen.getByText("Update");
        fireEvent.click(updateButton);

        expect(mockOnUpdate).toHaveBeenCalledWith(CustomerStatusEnum.inactive);
    });
});
