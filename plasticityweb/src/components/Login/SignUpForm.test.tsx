import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import SignUpForm from "./SignUpForm";
import useAuth, { AuthProvider } from "../../useAuth";
import * as userUtils from "../../api/sessionAPI";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { create } from "react-test-renderer";
import { signUp } from "../../api/users";

it("All Fields should validation on blur", async () => {
  const { getByLabelText, getByTestId } = render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>,
  );
  const email = getByLabelText("Email");
  const password = getByLabelText("Password");
  const firstName = getByLabelText("First name");
  const lastName = getByLabelText("Last name");
  const role = getByLabelText("Role");
  const retypePassword = getByLabelText("Re-Type Password");

  fireEvent.blur(email);
  fireEvent.blur(password);
  fireEvent.blur(firstName);
  fireEvent.blur(lastName);
  fireEvent.blur(role);
  fireEvent.blur(retypePassword);

  await waitFor(() => {
    expect(getByTestId("emailError")).not.toBe(null);
    expect(getByTestId("emailError")).toHaveTextContent("Required");

    expect(getByTestId("passwordError")).not.toBe(null);
    expect(getByTestId("passwordError")).toHaveTextContent("No password provided.");

    expect(getByTestId("passwordConfirmationError")).not.toBe(null);
    expect(getByTestId("passwordConfirmationError")).toHaveTextContent("Required");

    expect(getByTestId("firstNameError")).not.toBe(null);
    expect(getByTestId("firstNameError")).toHaveTextContent("Required");

    expect(getByTestId("lastNameError")).not.toBe(null);
    expect(getByTestId("lastNameError")).toHaveTextContent("Required");

    expect(getByTestId("roleError")).not.toBe(null);
    expect(getByTestId("roleError")).toHaveTextContent("Required");
  });
});

it("Passwords must match", async () => {
  const { getByLabelText, getByTestId } = render(
    <BrowserRouter>
      <SignUpForm />
    </BrowserRouter>,
  );

  const password = getByLabelText("Password");
  const retypePassword = getByLabelText("Re-Type Password");

  fireEvent.change(password, { target: { value: "TESTPPassword" } });
  fireEvent.change(retypePassword, { target: { value: "TESTPPasswordasdads" } });

  fireEvent.blur(retypePassword);

  // TODO
  await waitFor(() => {
    expect(getByTestId("passwordConfirmationError")).not.toBe(null);
    expect(getByTestId("passwordConfirmationError")).toHaveTextContent("Passwords must match");
  });
});
