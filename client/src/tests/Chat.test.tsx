import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "../components/Chat";
import { BrowserRouter } from "react-router-dom";

describe("Chat", () => {
  it("renders Chat Component", () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    const input = screen.getByRole("chat-input");
    expect(input).toBeInTheDocument();
  });
});
