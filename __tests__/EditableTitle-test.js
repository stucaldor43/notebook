import React from "react";
import {render, screen} from "@testing-library/react";
import EditableTitle from "../src/js/components/EditableTitle";
import userEvent from "@testing-library/user-event";

describe("EditableTitle", function() {
  it("renders without crashing", function() {
    render(<EditableTitle title="My notes" updateTitle={() => {}}/>);
  });

  it("renders correct title", function() {
    render(<EditableTitle title="My notes" updateTitle={() => {}}/>);
    expect(screen.getByDisplayValue("My notes")).toBeInTheDocument();
  });

  it("invokes updateTitle function when user enters input", function() {
    const mockFn = jest.fn();
    render(<EditableTitle title="My notes" updateTitle={mockFn}/>);
    
    expect(mockFn).not.toHaveBeenCalled();
    userEvent.type(screen.getByDisplayValue("My notes"), "abc");
    expect(mockFn).toHaveBeenCalled();
  });
});