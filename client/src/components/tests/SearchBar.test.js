import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";

describe("SearchBar Component", () => {
  // Mock function to simulate the onSearch callback
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    // Clear all mock function calls before each test
    mockOnSearch.mockClear();
  });

  // Test 1: Check if the component renders correctly
  it("renders correctly", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText("Search users...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  // Test 2: Check if the query state updates when input changes
  it("updates the query state when input changes", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search users...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  // Test 3: Check if onSearch is called with the correct value when form is submitted
  it("calls onSearch with the input value when form is submitted", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search users...");
    const button = screen.getByText("Search");
    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  // Test 4: Snapshot test using @testing-library/react
  it("matches snapshot", () => {
    // Render the component
    const { asFragment } = render(<SearchBar onSearch={mockOnSearch} />);
    // Use the rendered output for the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
