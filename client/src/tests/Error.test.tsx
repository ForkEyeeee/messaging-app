import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Error from "../components/Error";
import { BrowserRouter } from "react-router-dom";

describe("Error", () => {
  it("renders Error Component", () => {
    render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>
    );
    const text = screen.getByText("Oops! Page not found.");
    expect(text).toBeInTheDocument();
  });
});
