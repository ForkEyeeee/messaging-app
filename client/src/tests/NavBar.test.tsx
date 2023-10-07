import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import NavBar from "../components/NavBar";
import Home from "../components/Home";
import App from "../App";
import { BrowserRouter } from "react-router-dom";

describe("NavBar", () => {
  it("renders NavBar Component", async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    expect(screen.getByTestId("navbar-container")).toBeInTheDocument();
  });
});
