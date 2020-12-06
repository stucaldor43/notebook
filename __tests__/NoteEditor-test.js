import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./../src/js/pages/App";
import NoteEditor from "./../src/js/pages/NoteEditor.jsx";
import userEvent from "@testing-library/user-event";
import notesAPI from "./../src/js/api/notes";
import tagsAPI from "./../src/js/api/tags";
import firebase from "./../src/database/db";
const db = firebase.firestore();

describe("NoteEditor", function () {
  const note1 = {
    title: "Test Note",
    selected: true,
    dateCreated: { nanoseconds: 481000000, seconds: 1599786497 },
    id: "ae1b6841-e68a-43b3-bc6a-bac3cbd82db5",
    text: "Lorem ipsum dolor sit amet mi amigo",
    tags: ["Soccer"]
  };
  const { location } = window;

  beforeAll(async () => {
    await firebase.auth().signInWithEmailAndPassword("bigworm72@yahoo.com", "abcdef");
  });

  afterAll(async () => {
    await Promise.all(firebase.apps().map((app) => app.delete()));
  })

  beforeEach(async () => {
    window.firebase = firebase;
    window.db = db;
    delete window.location;
    window.location = { pathname: '/' };
    localStorage.clear();
    localStorage.getItem.mockReturnValue(JSON.stringify({ name: "ezel74" }));
    await notesAPI().createNote(note1);
})

  afterEach(() => {
    window.location = location;
  });

  it("renders without crashing", async function () {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );
  });

  it("shows note title, text and tags", async function () {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );

    expect(await screen.findByDisplayValue(note1.title)).toBeInTheDocument();
    expect(await screen.findByText(note1.text)).toBeInTheDocument();
    for (const tag of note1.tags) {
      expect(await screen.findByText(tag)).toHaveTextContent(tag);
    }
  });

  it("allows user to change note title", async function() {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );

    userEvent.type(await screen.findByDisplayValue(note1.title), "{selectall}{backspace}New title");
    expect(screen.getByDisplayValue("New title")).toBeInTheDocument();
  });

  it("allows user to change note text", async function() {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );
    
    const element = await screen.findByText(note1.text);
    userEvent.click(element);
    userEvent.type(element, "{backspace}{backspace}");
    expect(element).toHaveTextContent("Lorem ipsum dolor sit amet mi ami");
  });

  it("allows user to delete tags", async function() {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );

    for (const tag of note1.tags) {
      expect(await screen.findByText(tag)).toHaveTextContent(tag);
      userEvent.click(await screen.findByTestId(`delete-${tag}-tag-button`));
    }
    
    for (const tag of note1.tags) {
      await waitFor(() => expect(screen.queryByTestId(`delete-${tag}-tag-button`)).not.toBeInTheDocument());
    }
  });

  it("allows user to add tags to note", async function() {
    render(
      <App>
        <NoteEditor params={{ id: note1.id }} />
      </App>
    );

    expect(await screen.findByPlaceholderText("enter tag name")).toBeInTheDocument();
    userEvent.type(await screen.findByPlaceholderText("enter tag name"), "Pinball");
    userEvent.click(await screen.findByText("Add"));
    await waitFor(async () => expect(await screen.findByText("Pinball")).toBeInTheDocument());
    await tagsAPI().deleteTag("Pinball");
  });
});