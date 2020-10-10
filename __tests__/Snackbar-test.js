import React from "react";
import { render, screen, cleanup, debug } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SnackBar from "../src/js/components/Snackbar";

describe("Snackbar", function () {
  afterEach(cleanup);
  it("renders without crashing", function () {
    render(<SnackBar options={{timeout: 3000, multiline: true, text: ""}} close={() => {}}/>);
  });

  it("renders provided text", function () {
    const text = "Unable to execute action. Please try again later.";
    render(<SnackBar options={{timeout: 3000, multiline: true, text}} close={() => {}}/>);
    
    const node = screen.getAllByText(name)[0];
    expect(node).toBeInTheDocument();
  });

  it("closes after timeout expires", function () {
    const text = "Something";
    const mockFn = jest.fn();
    const timeout = 3000;
    render(<SnackBar options={{timeout, multiline: true, text: text}} close={mockFn}/>);
    
    expect(mockFn).not.toHaveBeenCalled();
    expect(screen.getByTestId("snackbar")).toBeVisible();

    setTimeout(function() {
      expect(mockFn).toHaveBeenCalled();
    }, timeout + 500)
  });

  it("can be closed manually", function() {
    const text = "Something";
    const mockFn = jest.fn();
    const timeout = 3000;
    render(<SnackBar options={{timeout, multiline: true, text: text}} close={mockFn}/>);
    
    expect(mockFn).not.toHaveBeenCalled();
    expect(screen.getByTestId("snackbar")).toBeVisible();

    const closeButtonText = "Close";
    userEvent.click(screen.getByText(closeButtonText));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});