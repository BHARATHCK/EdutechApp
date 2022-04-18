import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import "./LoginForm.styles.scss";
import * as Yup from "yup";
import useAuth from "../../useAuth";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const { signUp, error, loading, user } = useAuth();
  const navigate = useNavigate();
  if (!loading && !error && user) {
    navigate("/dashboard");
  }

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    role: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box className="loginForm" w={[300, 400, 500]}>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            passwordConfirmation: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            const signUpPromise = signUp(
              values.email,
              values.firstName,
              values.lastName,
              values.password,
              values.role,
            ).catch((data: any) => {
              if (data.status == 409) {
                setFieldError("email", "Email already exists");
              }
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
                    <FormErrorMessage data-testid="firstNameError">
                      {form.errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.lastName && form.touched.lastName}>
                    <FormLabel htmlFor="lastName">Last name</FormLabel>
                    <Input {...field} id="lastName" placeholder="Last name" />
                    <FormErrorMessage data-testid="lastNameError">
                      {form.errors.lastName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Email" />
                    <FormErrorMessage data-testid="emailError">
                      {form.errors.email}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="role">
                {({ field, form, handleBlur, handleChange }: any) => (
                  <FormControl isInvalid={form.errors.role && form.touched.role}>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <Select {...field} id="role" placeholder="Select Role" value={form.role}>
                      <option>student</option>
                      <option>teacher</option>
                    </Select>
                    <FormErrorMessage data-testid="roleError">{form.errors.role}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input {...field} id="password" type="password" placeholder="Password" />
                    <FormErrorMessage data-testid="passwordError">
                      {form.errors.password}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="passwordConfirmation">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={
                      form.errors.passwordConfirmation && form.touched.passwordConfirmation
                    }
                  >
                    <FormLabel htmlFor="passwordConfirmation">Re-Type Password</FormLabel>
                    <Input
                      {...field}
                      id="passwordConfirmation"
                      type="password"
                      placeholder="Re-Type Password"
                    />
                    <FormErrorMessage data-testid="passwordConfirmationError">
                      {form.errors.passwordConfirmation}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" isLoading={loading} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default SignUpForm;
