import React from "react";
import { render, screen } from "@testing-library/react";
import FormBuilder from "./FormBuilder";
import "@testing-library/jest-dom";

describe("FormBuilder - Smoke Test", () => {
  test("renders the Add Text Field button", () => {
    render(<FormBuilder />);
    expect(React).toBeTruthy();

    // Check if the "Add Text Field" button is in the document
    expect(screen.getByText(/Add Text Field/i)).toBeInTheDocument();
  });
});
