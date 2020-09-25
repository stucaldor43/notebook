import React from "react";
import { render, screen } from "@testing-library/react";
import Tag from "../src/js/components/Tag";
import userEvent from "@testing-library/user-event";

describe("Tag", function () {
  it("renders without crashing", function () {
    render(<Tag name="Philosophy" deleteTag={() => { }} />)
  });

  it("renders name", function () {
    const name = "Philosophy";
    render(<Tag name={name} deleteTag={() => { }} />)
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it("triggers correct handler when user clicks on close icon", function () {
    const mockFn = jest.fn();
    const name = "Philosophy";
    render(<Tag name={name} deleteTag={mockFn} />);

    expect(mockFn).not.toHaveBeenCalled();
    userEvent.click(screen.getByTestId("cross-svg"));
    expect(mockFn).toHaveBeenCalled();
  })
});