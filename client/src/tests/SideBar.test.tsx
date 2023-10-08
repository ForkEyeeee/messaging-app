import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SideBar from "../components/SideBar";
import { BrowserRouter } from "react-router-dom";

describe("SideBar", () => {
  it("renders SideBar Component", async () => {
    render(
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>
    );
    const button = screen.getByTestId("hamburger-icon");
    fireEvent.click(button);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
});
