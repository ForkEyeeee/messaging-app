import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Login from "../components/Login";
import { BrowserRouter } from "react-router-dom";

describe("Login", () => {
  it("renders Login Component", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const loginText = screen.getByText("Login");
    const signUpText = screen.getByText("Don't have an account?");
    const button = screen.getByRole("button");
    expect(loginText).toBeInTheDocument();
    expect(signUpText).toBeInTheDocument();
    expect(button.textContent).toBe("Next");
  });
  it("next button performs the desired onclick action", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const handleClick = vi.fn();
    handleClick("hello", 1);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(vi.isMockFunction(handleClick)).toBe(true);
    expect(handleClick.mock.calls[0]).toEqual(["hello", 1]);
  });
});
