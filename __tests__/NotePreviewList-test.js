import React from "react";
import {render, screen} from "@testing-library/react";
import NotePreviewList from "../src/js/components/NotePreviewList";

describe("NotePreviewList", function() {
  const notes = [
    {
      title:"Ezel's First Note",
      selected:true,
      dateCreated: {nanoseconds: 481000000, seconds: 1599786497},
      id: "04899fd7-6c40-4b17-b8ac-c01411c96bc7",
      text: "I have no idea if this will work. Maybe it did",
      tags:["Sporst", "Skiing", "2"]
    },
    {
      title:"Ezel's Second Note",
      selected:true,
      dateCreated: {nanoseconds: 481000000, seconds: 1599786494},
      id: "04899fd7-6c40-4b17-b9ad-c01411c96bc7",
      text: "It works!!! I can't believe it",
      tags:["Sports"]
    }
  ]

  it("renders without crashing", function() {
    render(<NotePreviewList notes={notes} selectNote={() => {}}/>);
  });

  it("renders items", function() {
    render(<NotePreviewList notes={notes} selectNote={() => {}}/>);
    
    const [firstItem, secondItem] = screen.getAllByTestId("note-preview-item");
    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
    expect(screen.getByText(notes[0].title)).toBeInTheDocument();
    expect(screen.getByText(notes[1].title)).toBeInTheDocument();
    expect(screen.getByText(notes[0].text.substring(0, 200), {exact: false})).toBeInTheDocument();
    expect(screen.getByText(notes[1].text.substring(0, 200), {exact: false})).toBeInTheDocument();
  })
});