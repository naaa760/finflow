import "@testing-library/jest-dom";
import TransactionForm from "../TransactionForm";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { transactionService } from "@/services/transactions";

// Mock the service
jest.mock("@/services/transactions", () => ({
  transactionService: {
    create: jest.fn(),
  },
}));

describe("TransactionForm", () => {
  const mockOnSuccess = jest.fn();
  const mockData = {
    amount: 100,
    category: "Food",
    description: "Groceries",
    type: "expense" as const,
    date: expect.any(String),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<TransactionForm onSuccess={mockOnSuccess} />);

    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    (transactionService.create as jest.Mock).mockResolvedValueOnce({
      id: "1",
      ...mockData,
    });
    render(<TransactionForm onSuccess={mockOnSuccess} />);

    fireEvent.change(screen.getByLabelText(/amount/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: "Food" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Groceries" },
    });
    fireEvent.change(screen.getByLabelText(/type/i), {
      target: { value: "expense" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add transaction/i }));

    await waitFor(() => {
      expect(transactionService.create).toHaveBeenCalledWith(mockData);
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("shows error message on failed submission", async () => {
    (transactionService.create as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to create")
    );
    render(<TransactionForm onSuccess={mockOnSuccess} />);

    fireEvent.click(screen.getByRole("button", { name: /add transaction/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/error creating transaction/i)
      ).toBeInTheDocument();
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });
});
