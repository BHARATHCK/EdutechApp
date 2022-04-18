import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import LoginForm from "./LoginForm";
import useAuth, { AuthProvider } from "../../useAuth";
import { Login } from "../../api/sessionAPI";
import * as userUtils from "../../api/sessionAPI";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { create } from "react-test-renderer";
import { ChakraProvider, theme } from "@chakra-ui/react";

const getAuthFunctions = () => {
  const { login } = useAuth();
  return login;
};

describe("Login Form", () => {
  it("renders correctly", () => {
    let renderer = create(
      <MemoryRouter initialEntries={["/login"]}>
        <Routes>
          <Route path="login" element={<LoginForm />}></Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

it("Email and Password should validation on blur", async () => {
  const { getByLabelText, getByTestId } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const email = getByLabelText("Email");
  const password = getByLabelText("Password");

  fireEvent.blur(email);
  fireEvent.blur(password);

  await waitFor(() => {
    expect(getByTestId("emailError")).not.toBe(null);
    expect(getByTestId("emailError")).toHaveTextContent("Required");
    expect(getByTestId("passwordError")).not.toBe(null);
    expect(getByTestId("passwordError")).toHaveTextContent("No password provided.");
  });
});

it("Show validation errors on Submit", async () => {
  const { getByText, getByTestId } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );

  const button = getByTestId("loginButton");
  fireEvent.click(button);

  await waitFor(() => {
    expect(getByTestId("emailError")).toHaveTextContent("Required");
    expect(getByTestId("passwordError")).toHaveTextContent("No password provided.");
  });
});

it("Should remove validation errors on entering values", async () => {
  const { getByText, getByTestId, queryByTestId, getByLabelText } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );

  const button = getByTestId("loginButton");
  fireEvent.click(button);

  const email = getByLabelText("Email");
  const password = getByLabelText("Password");

  fireEvent.change(email, { target: { value: "mockemail@email.com" } });
  fireEvent.change(password, { target: { value: "TESTPPassword" } });

  await waitFor(() => {
    expect(queryByTestId("emailError")).toBe(null);
    expect(queryByTestId("passwordError")).toBe(null);
  });
});

describe("Login Form with context", () => {
  it("routed to login page with context", () => {
    let renderer = create(
      <BrowserRouter>
        <AuthProvider>
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              <Route path="login" element={<LoginForm />}></Route>
            </Routes>
          </MemoryRouter>
        </AuthProvider>
      </BrowserRouter>,
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});

it("Test Authentication validation errors", async () => {
  const { getByText, getByTestId, queryByTestId, getByLabelText } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );

  const email = getByLabelText("Email");
  const password = getByLabelText("Password");

  fireEvent.change(email, { target: { value: "mockemail@email.com" } });
  fireEvent.change(password, { target: { value: "TESTPPassword" } });

  const button = getByText("Log In");
  fireEvent.click(button);

  const mockuserData = {
    firstName: "bharath",
    lastName: "chandra",
    email: "bharathchandra541@gmail.com",
    role: "student",
    isActive: true,
    id: 37,
    password: "",
  };
  const mockGetLoginInfo = jest.spyOn(userUtils, "Login");
  mockGetLoginInfo.mockResolvedValue(mockuserData);

  await waitFor(() => {
    //expect(Login).toHaveBeenCalledTimes(1);
    expect(queryByTestId("emailError")).toBe(null);
    expect(queryByTestId("passwordError")).toBe(null);
  });
});
