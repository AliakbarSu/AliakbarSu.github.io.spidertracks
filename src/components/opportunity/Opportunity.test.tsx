import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Opportunities from "./Opportunity";
import { describe, test, expect, vi } from "vitest"
import { Opportunity, OpportunityStatusEnum } from "types/Opportunity";

const mockOpportunities: Opportunity[] = [
    { id: "opt1", name: "Opportunity 1", status: OpportunityStatusEnum.closedLost },
    { id: "opt2", name: "Opportunity 2", status: OpportunityStatusEnum.closedWon },
];

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom') as any
    return {
        ...actual,
        Link: function Link(props: any) { return <div {...props}>{props.children}</div> },
    }
})

describe("Opportunities", () => {
    test("Should render opportunities correctly when there are opportunities", () => {
        render(
            <Opportunities opportunities={mockOpportunities} customerId="123" />, { wrapper: BrowserRouter }
        );
        expect(screen.getByText("Opportunity 1")).toBeDefined();
        expect(screen.getByText("Opportunity 2")).toBeDefined();
    });

    test("Should render 'No opportunities' when there are no opportunities", () => {
        render(
            <Opportunities opportunities={[]} customerId="123" />
        );
        expect(screen.getByText("No opportunities")).toBeDefined();
    });

    test("Should render 'Add new opportunity' correctly", () => {
        render(
            <Opportunities opportunities={mockOpportunities} customerId="123" />, { wrapper: BrowserRouter }
        );
        const addOpportunityLink = screen.getByText("Add new opportunity");
        expect(addOpportunityLink).toBeDefined();
    });
});
