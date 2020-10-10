import React from 'react';
import { render, screen } from "@testing-library/react";
import TitleWithOptionalButton from '../src/js/components/TitleWithOptionalButton';

describe("Button", () => {
  it("renders without crashing", function() {
    render(<TitleWithOptionalButton title={''}><button>Test Button</button></TitleWithOptionalButton>);
  });

  it("renders children", function() {
    const text = "Click Me";
    render(<TitleWithOptionalButton title="Title 1"><button>{text}</button></TitleWithOptionalButton>)
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("renders title", function() {
    const title = "Class Notes"
    render(<TitleWithOptionalButton title={title}/>);

    expect(screen.getByText(title)).toBeInTheDocument();
  })
});