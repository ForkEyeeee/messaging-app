import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home";
import { BrowserRouter } from "react-router-dom";

describe("Home", () => {
  it("renders Home Component", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const text = screen.getByText("Please select a user to start messaging.");
    expect(text).toBeInTheDocument();
  });
});
