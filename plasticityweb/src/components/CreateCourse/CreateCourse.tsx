import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Progress,
  Select,
  Switch,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useAuth from "../../useAuth";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import MdEditor from "../MdEditor/MdEditor";
import FilePicker from "../FilePicker/FilePicker";
import "./CreateCourse.styles.scss";

const CreateCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({});
  const [nextSteps, setNextSteps] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const courseValidationSchema = Yup.object().shape({
    courseName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    courseType: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    description: Yup.string().min(10, "Too Short!").max(500, "Too Long!").required("Required"),
    author: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  });

  useEffect(() => {
    setProgressValue(progressValue + 34);
  }, [nextSteps]);

  return (
    <Box>
      <Progress value={progressValue} />
      <Flex justifyContent="center" alignItems="center" mt={20}>
        <Box>
          <Text fontWeight="semibold" fontSize="large" ml="-20" className="underline--magical">
            {nextSteps === 0 && "Just need a few details to get your course up"}
            {nextSteps === 1 && "Add notes for your course [supports MD]"}
            {nextSteps === 2 && "Add Videos for you course"}
          </Text>
          {nextSteps === 1 ? (
            <Box w={[400, 500, 600]} mt={20}>
              <MdEditor
                currentFormData={formData}
                setFormData={setFormData}
                setNextSteps={setNextSteps}
              />
            </Box>
          ) : nextSteps === 0 ? (
            <Box w={[300, 400, 500]} mt={20}>
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
                        <FormControl
                          isInvalid={form.errors.description && form.touched.description}
                        >
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
                        <FormControl
                          isInvalid={form.errors.isPublished && form.touched.isPublished}
                        >
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
                      Continue
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          ) : nextSteps === 2 ? (
            <Box w={[400, 500, 600]} mt={20}>
              <FilePicker
                currentFormData={formData}
                setCurrentFormData={setFormData}
                setnextSteps={setNextSteps}
              />
            </Box>
          ) : (
            nextSteps === 3 && null
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateCourse;
