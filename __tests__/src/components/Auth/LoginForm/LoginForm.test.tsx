import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import LoginForm from "../../../../../src/components/Auth/LoginForm/LoginForm";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

describe("<LoginForm />", () => {
  it("should renders correctly", () => {
    const component = render(
      <MockedProvider mocks={[]}>
        <LoginForm />
      </MockedProvider>
    );

    component.getByText("Log in to see photos and videos of your friends");
    component.getByTestId("login-form");
  });

  it("should display password when clicking eye icon", async () => {
    const component = render(
      <MockedProvider mocks={[]}>
        <LoginForm />
      </MockedProvider>
    );

    const loginForm = component.getByTestId("login-form");
    const passwordField = loginForm.querySelector(
      "input[name='password']"
    )! as HTMLInputElement;
    expect(passwordField.type).toBe("password");

    const eyeIcon = component.getByTestId("eye-icon-password");
    await userEvent.click(eyeIcon);

    expect(passwordField.type).toBe("text");
  });

});
