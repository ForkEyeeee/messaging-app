import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Message from "../components/Message";
import { BrowserRouter } from "react-router-dom";
import { describe, it, vi, expect } from "vitest";

describe("Message", () => {
  it("renders Message Component", () => {
    const handleClick = vi.fn();
    render(
      <BrowserRouter>
        <Message
          justifyContent={""}
          backGround={""}
          color={""}
          content={""}
          popOverPlacement={handleClick}
          isSender={false}
          messages={[]}
          setMessages={handleClick}
          messageId={""}
          isOpen={false}
          setOpenMessageId={handleClick}
        />
      </BrowserRouter>
    );
    const card = screen.getByRole("message-card");
    expect(card).toBeInTheDocument();
  });
});
