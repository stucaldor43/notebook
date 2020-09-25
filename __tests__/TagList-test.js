import React from 'react';
import { render, screen } from "@testing-library/react";
import TagList from "../src/js/components/TagList";
import userEvent from "@testing-library/user-event";

describe("TagList", function() {
  it("renders without crashing", function() {
    render(<TagList tags={["Philosophy", "Sports", "Life"]} removeTag={() => {}}/>)
  });

  it("renders tags", function() {
    const tags = ["Philosophy", "Sports", "Life"];
    render(<TagList tags={tags} removeTag={() => {}}/>);

    for (const tag of tags) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it("invokes correct click handler when user attempts to delete tag", function() {
    const mockFn = jest.fn();
    render(<TagList tags={["Philosophy", "Sports", "Life"]} removeTag={mockFn}/>);

    expect(mockFn).not.toHaveBeenCalled();
    userEvent.click(screen.getAllByTestId("cross-svg")[0]);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
})