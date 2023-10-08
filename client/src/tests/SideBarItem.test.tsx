import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SideBarItem from "../components/SideBar";
import { BrowserRouter } from "react-router-dom";

describe("SideBarItem", () => {
  it("renders SideBarItem Component", async () => {
    render(
      <BrowserRouter>
        <SideBarItem />
      </BrowserRouter>
    );
    const button = screen.getByTestId("hamburger-icon");
    fireEvent.click(button);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
});
