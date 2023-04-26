import { describe, it, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider } from "@apollo/client/testing";
import SignUpForm from "../../../../../src/components/Auth/SignUpForm";

describe("<SignUpForm />", () => {
  it("should renders correctly", () => {
    const handleShowLogin = vi.fn();
    const component = render(
      <MockedProvider mocks={[]}>
        <SignUpForm handleShowLogin={handleShowLogin} />
      </MockedProvider>
    );

    component.getByText("Sign up to see photos and videos of your friends");
    component.getByTestId("signup-form");
  });

  it("should display password when clicking eye icon", async () => {
    const user = userEvent.setup();

    const handleShowLogin = vi.fn();
    const component = render(
      <MockedProvider mocks={[]}>
        <SignUpForm handleShowLogin={handleShowLogin} />
      </MockedProvider>
    );

    const signUpForm = component.getByTestId("signup-form");
    const passwordField = signUpForm.querySelector("input[name='password']");
    expect(passwordField?.getAttribute("type")).toBe("password");

    const eyeIcon = component.getByTestId("eye-icon-password");
    await user.click(eyeIcon);
    expect(passwordField?.getAttribute("type")).toBe("text");
  });
});
