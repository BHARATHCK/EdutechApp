import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import "./LoginForm.styles.scss";
import * as Yup from "yup";
import useAuth from "../../useAuth";
import PlasticityButton from "../PlasticityButton/PlasticityButton";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login, error, loading, user } = useAuth();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box className="loginForm" w={[300, 400, 500]}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            login(values.email, values.password)
              .then((data: any) => {
                // Handled by router - Nothing to do here
              })
              .catch((error: any) => {
                if (error.status == 409) {
                  setFieldError("email", "Email or Password is incorrect");
                }
              });
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
              <Flex flexDir="column" alignItems="center">
                <Button mt={4} mb={4} colorScheme="teal" isLoading={loading} type="submit">
                  Log In
                </Button>
                <PlasticityButton
                  handleClick={() => {
                    navigate("/signup");
                  }}
                  isSubmitting={false}
                  text="Join Plasticity Instead"
                  variant="outline"
                  addMargin={false}
                />
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default LoginForm;
