import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import "./LoginForm.styles.scss";
import * as Yup from "yup";

const LoginForm = () => {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  return (
    <div className="loginForm">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log("Sending request : ", values);
          postData("http://localhost:3000/users", values).then((data) => {
            console.log(data);
            setSubmitting(false);
          });
        }}
      >
        {(props) => (
          <Form>
            <Field name="firstName">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.firstName && form.touched.firstName}>
                  <FormLabel htmlFor="firstName">First name</FormLabel>
                  <Input size="md" {...field} id="firstName" placeholder="First Name" />
                  <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="lastName">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                  <FormLabel htmlFor="lastName">Last name</FormLabel>
                  <Input {...field} id="lastName" placeholder="Last name" />
                  <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" type="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="passwordConfirmation">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.passwordConfirmation && form.touched.passwordConfirmation}
                >
                  <FormLabel htmlFor="passwordConfirmation">Password</FormLabel>
                  <Input
                    {...field}
                    id="passwordConfirmation"
                    type="password"
                    placeholder="Re-Type Password"
                  />
                  <FormErrorMessage>{form.errors.passwordConfirmation}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
