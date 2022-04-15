import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useAuth from "../../useAuth";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import MdEditor from "../MdEditor/MdEditor";
import FilePicker from "../FilePicker/FilePicker";

const CreateCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [nextSteps, setNextSteps] = useState(0);

  const courseValidationSchema = Yup.object().shape({
    courseName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    courseType: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    description: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    author: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  });

  return (
    <div>
      {nextSteps === 1 ? (
        <MdEditor
          currentFormData={formData}
          setFormData={setFormData}
          setNextSteps={setNextSteps}
        />
      ) : nextSteps === 0 ? (
        <Formik
          initialValues={{
            courseName: "",
            courseType: "",
            description: "",
            isPublished: false,
            author: user?.email,
          }}
          validationSchema={courseValidationSchema}
          onSubmit={(values, { setSubmitting, setFieldError }) => {
            console.log("Sending request : ", values);
            setFormData(values);
            setNextSteps(1);
            setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="courseName">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.courseName && form.touched.courseName}>
                    <FormLabel htmlFor="courseName">Course name</FormLabel>
                    <Input size="md" {...field} id="courseName" placeholder="Course Name" />
                    <FormErrorMessage>{form.errors.courseName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="courseType">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.courseType && form.touched.courseType}>
                    <FormLabel htmlFor="courseType">Course Type</FormLabel>
                    <Select {...field} id="courseType" placeholder="Select Course Type">
                      <option>Notes Only</option>
                      <option>Video Only</option>
                      <option>Video + Notes</option>
                    </Select>
                    <FormErrorMessage>{form.errors.courseType}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="description">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.description && form.touched.description}>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Input
                      {...field}
                      id="description"
                      placeholder="Breif description about the course"
                    />
                    <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="isPublished">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.isPublished && form.touched.isPublished}>
                    <FormLabel htmlFor="isPublished">Publish ?</FormLabel>
                    <Switch id="isPublished" {...field} />
                    <FormErrorMessage>{form.errors.isPublished}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="author">
                {({ field, form }: any) => (
                  <FormControl isInvalid={form.errors.author && form.touched.author}>
                    <FormLabel htmlFor="author">Author</FormLabel>
                    <Input
                      {...field}
                      id="passwordConfirmation"
                      placeholder="Re-Type Password"
                      readOnly={true}
                      value={`${user?.firstName} <${user?.email}>`}
                    ></Input>
                    <FormErrorMessage>{form.errors.author}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      ) : nextSteps === 2 ? (
        <FilePicker
          currentFormData={formData}
          setCurrentFormData={setFormData}
          setnextSteps={setNextSteps}
        />
      ) : (
        nextSteps === 3 && null
      )}
    </div>
  );
};

export default CreateCourse;
