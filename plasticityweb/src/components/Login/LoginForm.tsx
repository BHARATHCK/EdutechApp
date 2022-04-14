import { Button, FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import "./LoginForm.styles.scss";
import * as Yup from "yup";
import GetUsers from "../Users/GetUsers";
import useAuth from "../../useAuth";

const LoginForm = () => {
  const { login, error, loading, user } = useAuth();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <div className="loginForm">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, setFieldError }) => {
          console.log("Sending request : ", values);
          login(values.email, values.password);
          setSubmitting(loading);
        }}
      >
        {(props) => (
          <Form>
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
            <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <GetUsers />
    </div>
  );
};

export default LoginForm;
