import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Chat from "../components/Chat";
import { BrowserRouter } from "react-router-dom";

describe("Chat", () => {
  it("renders Chat Component", async () => {
    render(
      <BrowserRouter>
        <Chat />
      </BrowserRouter>
    );
    const input = await screen.findByRole("chat-input");
    expect(input).toBeInTheDocument();
  });
});
