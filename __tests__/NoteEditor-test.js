import React from "react";
import { render, screen } from "@testing-library/react";
import NoteContext from "../src/js/context/note-context";
import AuthContext from "../src/js/context/auth-context";
import NoteEditor from "./../src/js/pages/NoteEditor.jsx";
import userEvent from "@testing-library/user-event";

jest.mock("./../src/js/api/tags");
jest.mock("./../src/js/api/notes");

describe("NoteEditor", function () {
  let notes, setNotes, editNote, loadNote, selectNote;

  beforeEach(() => {
    jest.mock("./../src/js/api/tags");
    jest.mock("./../src/js/api/notes");

    notes = [{
      title: "Ezel's First Note",
      selected: true,
      dateCreated: { nanoseconds: 481000000, seconds: 1599786497 },
      id: "04899fd7-6c40-4b17-b8ac-c01411c96bc7",
      text: "I have no idea if this will work. Maybe it did",
      tags: ["Sporst", "Skiing", "2"]
    },
    {
      title: "Ezel's Second Note",
      selected: false,
      dateCreated: { nanoseconds: 481000000, seconds: 1599786494 },
      id: "04899fd7-6c40-4b17-b9ad-c01411c96bc7",
      text: "It works!!! I can't believe it",
      tags: ["Sports"]
    }];
    setNotes = jest.fn()
    editNote = jest.fn();
    loadNote = jest.fn();
    selectNote = jest.fn();
  })
  afterEach(() => {
    jest.unmock("./../src/js/api/tags");
    jest.unmock("./../src/js/api/notes");
  });

  function customRender(ui) {
    return render(
      <AuthContext.Provider value={{ user: {}, isSignedIn: true }}>
        <NoteContext.Provider value={{ notes, editNote, loadNote, selectNote }}>
          {ui}
        </NoteContext.Provider>
      </AuthContext.Provider>
    );
  }

  it("renders without crashing", function () {
    render(<NoteEditor params={{ id: notes[0].id }} />)
  });

  it("renders note title", async function (done) {
    customRender(<NoteEditor params={{ id: notes[0].id }} />);

    expect(await screen.findByDisplayValue(notes[0].title)).toBeInTheDocument();
    setTimeout(function () {
      done();
    }, 3000);
  });

  it("renders note text", async function (done) {
    customRender(<NoteEditor params={{ id: notes[0].id }} />);

    expect(await screen.findByText(notes[0].text)).toBeInTheDocument();
    setTimeout(function () {
      done();
    }, 3000);
  });

  it("renders note tags", async function (done) {
    customRender(<NoteEditor params={{ id: notes[0].id }} />);

    for (const tag of notes[0].tags) {
      expect(await screen.findByText(tag)).toBeInTheDocument();
    }
    setTimeout(function () {
      done();
    }, 3000);
  });

  it("has an input which allows tags to be added", async function (done) {
    customRender(<NoteEditor params={{ id: notes[0].id }} />);

    expect(await screen.findByPlaceholderText("Add tag")).toBeInTheDocument();
    userEvent.type(await screen.findByPlaceholderText("Add tag"), "basketball{enter}");
    expect(await screen.findByPlaceholderText("Add tag")).toHaveDisplayValue("");
    expect(await screen.findByText("basketball")).toBeInTheDocument();
    setTimeout(function () {
      done();
    }, 3000);
  });
});