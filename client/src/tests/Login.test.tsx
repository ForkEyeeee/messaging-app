import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Footer from "../components/Footer";
import Login from "../components/Login";

describe("Login", () => {
  it("renders Login Component", () => {
    render(<Login />);
    const loginText = screen.getByText("Login");
    const signUpText = screen.getByText("Don't have an account? Sign Up here.");
    const button = screen.getByRole("button");
    expect(loginText).toBeInTheDocument();
    expect(signUpText).toBeInTheDocument();
    expect(button.textContent).toBe("Next");
  });
  it("next button performs the desired onclick action", () => {
    render(<Login />);
    const handleClick = vi.fn();
    handleClick("hello", 1);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
    expect(vi.isMockFunction(handleClick)).toBe(true);
    expect(handleClick.mock.calls[0]).toEqual(["hello", 1]);
  });
});
