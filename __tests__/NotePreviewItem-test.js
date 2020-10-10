import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NotePreviewItem from '../src/js/components/NotePreviewItem';

const item = {
  title:"Ezel's First Note",
  selected:true,
  dateCreated: {nanoseconds: 481000000, seconds: 1599786497},
  id: "04899fd7-6c40-4b17-b8ac-c01411c96bc7",
  text: "I have no idea if this will work. Maybe it did",
  tags:["Sporst", "Skiing", "2"]
};

describe("NotePreviewItem", () => {
  const { location } = window;

  beforeEach(() => {
    delete window.location;
    window.location = { assign: jest.fn(() => window.location.pathname = `/#/note/${item.id}` ) };
  });

  afterEach(() => {
    window.location = location;
  });

  it("renders without crashing", function() {
    render(<NotePreviewItem item={item} selectNote={() => {}}/>);
  });

  it("renders note title", function() {
    render(<NotePreviewItem item={item} selectNote={() => {}}/>);
    expect(screen.getByText(item.title)).toBeInTheDocument();
  })

  it("renders some of the note text", function() {
    render(<NotePreviewItem item={item} selectNote={() => {}}/>);
    expect(screen.getByText(item.text.substring(0, 200), {exact: false})).toBeInTheDocument();
  });

  it("sends user to note editor when clicked", function() {
    const mockFn = jest.fn();
    render(<NotePreviewItem item={item} selectNote={mockFn}/>);

    expect(mockFn).not.toHaveBeenCalled();
    expect(window.location.assign).not.toHaveBeenCalled();
    userEvent.click(screen.getByTestId("note-preview-item"));
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).toEqual(`/#/note/${item.id}`)
  });

  it("sends user to note editor when user hits enter while it has focus", function() {
    const mockFn = jest.fn();
    render(<NotePreviewItem item={item} selectNote={mockFn}/>);

    expect(mockFn).not.toHaveBeenCalled();
    expect(window.location.assign).not.toHaveBeenCalled();
    expect(document.body).toHaveFocus();
    userEvent.tab();
    expect(screen.getByTestId("note-preview-item")).toHaveFocus();
    userEvent.type(screen.getByTestId("note-preview-item"), "{enter}", {skipClick: true})
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).toEqual(`/#/note/${item.id}`)
  });
});