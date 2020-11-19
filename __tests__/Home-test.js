import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./../src/js/pages/App";
import userEvent from "@testing-library/user-event";
import firebase from "./../src/database/db";
import Home from "../src/js/pages/Home";
import { deleteNoteByTitle, deleteTagByName } from "./../__test-utils__/helpers";

const db = firebase.firestore();

describe("Home", function () {
  const { location } = window;
  const user = { name: "testuser", email: "testemail@yahoo.com", password: "Ljmd#39Ay73@k" }
  
  beforeAll(async () => {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
    userCredential.user.updateProfile({ displayName: user.name });
  });

  afterAll(async () => {
    await db.collection("users")
      .doc(user.name)
      .delete();
    await Promise.all(firebase.apps().map((app) => app.delete()));
  })

  beforeEach(async () => {
    window.firebase = firebase;
    window.db = db;
    delete window.location;
    window.location = { pathname: '/', assign: jest.fn(), href: '' };
    localStorage.clear();
    localStorage.getItem.mockReturnValue(JSON.stringify({ name: user.name }));
  })

  afterEach(() => {
    window.location = location;
  });

  it("renders without crashing", function () {
    render(
      <App>
        <Home />
      </App>
    );
  });

  it("allows user to add notes", async function () {
    await deleteNoteByTitle("A Medium Length Title");
    render(
      <App>
        <Home />
      </App>
    );
    
    userEvent.click(await screen.findByText("Add Note"));
    userEvent.type(await screen.findByPlaceholderText("Title of note"), "A Medium Length Title");
    userEvent.click(await screen.findByText("Create"));
    expect(await screen.findByTestId("note-preview-item")).toBeInTheDocument();
    await deleteNoteByTitle("A Medium Length Title");
  });

  it("allows user to add tag", async function (done) {
    await deleteTagByName("Skydiving");
    render(
      <App>
        <Home />
      </App>
    );

    userEvent.click(await screen.findByTestId("open-tag-manager-button"));
    const input = await screen.findByPlaceholderText("Add a tag and press enter");
    await userEvent.type(input, "Skydiving{enter}");
    setTimeout(async function() {
      expect(await screen.findByPlaceholderText("Add a tag and press enter")).toHaveDisplayValue("");
      await deleteTagByName("Skydiving");
      done();
    }, 2000);
  });

  it("allows user to delete tag", async function (done) {
    await deleteTagByName("Basketball");
    render(
      <App>
        <Home />
      </App>
    );

    userEvent.click(await screen.findByTestId("open-tag-manager-button"));
    const input = await screen.findByPlaceholderText("Add a tag and press enter");
    await userEvent.type(input, "Basketball{enter}");
    setTimeout(async function() {
      expect(await screen.findByText("Basketball")).toBeInTheDocument();
    }, 2000);
    userEvent.click(await screen.findByTestId("delete-Basketball-tag-button"));
    setTimeout(async function() {
      expect(await screen.queryByText("Basketball")).not.toBeInTheDocument();
      await deleteTagByName("Basketball");
      done();
    }, 2000);
    
  });

  it("allows user to click a note to get to note page", async function () {
    await deleteNoteByTitle("A Medium Length Title");
    render(
      <App>
        <Home />
      </App>
    );
    
    const initialTimesCalledCount = window.location.assign.mock.calls.length;
    userEvent.click(await screen.findByText("Add Note"));
    userEvent.type(await screen.findByPlaceholderText("Title of note"), "A Medium Length Title");
    userEvent.click(await screen.findByText("Create"));
    userEvent.click(await screen.findByTestId("note-preview-item"));
    expect(window.location.assign.mock.calls.length).toBeGreaterThan(initialTimesCalledCount);
    await deleteNoteByTitle("A Medium Length Title");
  });
}); 