import React from 'react';
import { getByText, render, screen } from "@testing-library/react";
import Button from '../src/js/components/Button';
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("renders without crashing", function() {
    render(<Button onClick={() => {}} classes="custom"></Button>);
  });

  it("renders children", function() {
    const text = "Click Me";
    render(<Button onClick={() => {}} classes="custom">{text}</Button>);
    
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("triggers click handler when clicked by user", function() {
    const mockFn = jest.fn();
    const text = "Click Me";
    render(<Button onClick={mockFn} classes="custom">{ text }</Button>)
    
    expect(mockFn).not.toHaveBeenCalled();
    userEvent.click(screen.getByText(text));
    expect(mockFn).toHaveBeenCalled();
  })
});