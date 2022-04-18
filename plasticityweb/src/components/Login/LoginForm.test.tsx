import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { App } from "../../App";
import LoginForm from "./LoginForm";

it("submits correct values", async () => {
  const { container } = render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const email = container.querySelector('input[name="email"]');
  const password = container.querySelector('input[name="password"]');
  const submit = container.querySelector('button[type="submit"]');
  const results = container.querySelector("textarea");

  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mockname",
      },
    });
  });

  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mock@email.com",
      },
    });
  });

  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "akjsdaisjdasjdhs",
      },
    });
  });

  await waitFor(() => {
    fireEvent.click(submit);
  });

  expect(results.innerHTML).toBe('{"email":"mock@email.com","name":"mockname","color":"green"}');
});
