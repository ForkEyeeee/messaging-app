import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Profile from "../components/Profile";
import { BrowserRouter } from "react-router-dom";

describe("Profile", () => {
  it("renders Profile Component", async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(await screen.getByText("Customize Profile")).toBeInTheDocument();
  });
});
