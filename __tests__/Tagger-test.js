// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Tagger from "../src/js/components/Tagger";

// jest.mock("./../src/js/api/tags");

// describe("Tagger", function () {
//   beforeEach(() => {
//     jest.mock("./../src/js/api/tags");
//   })
//   afterEach(() => {
//     jest.unmock("./../src/js/api/tags");
//   })

//   const tags = ["first", "second", "third"];

//   it("renders without crashing", function () {
//     render(<Tagger tags={tags} addTag={() => {}} removeTag={() => {}}/>);
//   });

//   it("renders checkboxes for list of tags", function(done) {
//     render(<Tagger tags={[]} addTag={() => {}} removeTag={() => {}}/>);
    
//     setTimeout(() => {
//       for (const tag of tags) {
//         expect(screen.getByLabelText(tag)).toBeInTheDocument();
//       }
//       done();
//     }, 300)
//   });

//   it("has one checked and two unchecked checkboxes that user can interact with", function(done) {
//     const mockFn = jest.fn();
//     render(<Tagger tags={["first"]} addTag={mockFn} removeTag={() => {}}/>);

//     setTimeout(() => {
//       expect(screen.getByLabelText("first")).toBeChecked();
//       expect(screen.getByLabelText("second")).not.toBeChecked();
//       expect(screen.getByLabelText("third")).not.toBeChecked();
//       expect(mockFn).not.toHaveBeenCalled();
//       userEvent.click(screen.getByLabelText("second"));
//       expect(mockFn).toHaveBeenCalled();
//       done();
//     }, 300)
//   });

//   it("renders add tag button that user can interact with", function(done) {
//     const addTagMock = jest.fn();
//     render(<Tagger tags={tags} addTag={addTagMock} removeTag={() => {}}/>);

//     setTimeout(() => {
//       expect(screen.getByText("Add")).toBeInTheDocument();
//       expect(addTagMock).not.toHaveBeenCalled()
//       userEvent.click(screen.getByText("Add"));
//       expect(addTagMock).toHaveBeenCalled();
//       done();
//     }, 300)
//   });

//   it("renders text input that user can interact with", function(done) {
//     render(<Tagger tags={tags} addTag={() => {}} removeTag={() => {}}/>);

//     setTimeout(() => {
//       expect(screen.getByPlaceholderText("enter tag name")).toBeInTheDocument();
//       userEvent.type(screen.getByPlaceholderText("enter tag name"), "some text");
//       expect(screen.getByDisplayValue("some text")).toBeInTheDocument();
//       done();
//     }, 300)
//   });
// });