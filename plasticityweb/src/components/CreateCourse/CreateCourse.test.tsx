import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import CreateCourse from "./CreateCourse";
import useAuth, { AuthProvider } from "../../useAuth";
import * as userUtils from "../../api/sessionAPI";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { create } from "react-test-renderer";
import { signUp } from "../../api/users";

it("All Fields should validation on blur", async () => {
  const { getByLabelText, getByTestId } = render(
    <BrowserRouter>
      <CreateCourse />
    </BrowserRouter>,
  );
  const courseName = getByLabelText("Course Name");
  const courseType = getByLabelText("Course Type");
  const description = getByLabelText("Description");
  const publish = getByLabelText("Publish ?");

  fireEvent.blur(courseName);
  fireEvent.blur(courseType);
  fireEvent.blur(description);

  await waitFor(() => {
    expect(getByTestId("courseNameError")).not.toBe(null);
    expect(getByTestId("courseNameError")).toHaveTextContent("Required");

    expect(getByTestId("courseTypeError")).not.toBe(null);
    expect(getByTestId("courseTypeError")).toHaveTextContent("Required");

    expect(getByTestId("descriptionError")).not.toBe(null);
    expect(getByTestId("descriptionError")).toHaveTextContent("Required");
  });
});

it("Check if form is working", async () => {
  const { getByLabelText, getByTestId } = render(
    <BrowserRouter>
      <CreateCourse />
    </BrowserRouter>,
  );
  const courseName = getByLabelText("Course Name");
  const courseType = getByLabelText("Course Type");
  const description = getByLabelText("Description");
  const publish = getByLabelText("Publish ?");

  fireEvent.blur(courseName);
  fireEvent.blur(courseType);
  fireEvent.blur(description);
  fireEvent.change(courseName, { target: { value: "Test Data" } });
  fireEvent.change(courseType, { target: { value: "Video + Notes" } });
  fireEvent.change(courseName, { target: { value: "Test Data" } });

  await waitFor(() => {
    expect(getByTestId("courseNameError")).not.toBe(null);
    expect(getByTestId("courseNameError")).toHaveTextContent("Required");

    expect(getByTestId("courseTypeError")).not.toBe(null);
    expect(getByTestId("courseTypeError")).toHaveTextContent("Required");

    expect(getByTestId("descriptionError")).not.toBe(null);
    expect(getByTestId("descriptionError")).toHaveTextContent("Required");
  });
});
