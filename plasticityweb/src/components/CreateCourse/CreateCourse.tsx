import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
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
import PublishFeedback from "../feedback/PublishFeedback";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({} as any);
  const [nextSteps, setNextSteps] = useState(1);
  const [progressValue, setProgressValue] = useState(1);
  const navigate = useNavigate();

  const courseValidationSchema = Yup.object().shape({
    courseName: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    courseType: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    description: Yup.string().min(10, "Too Short!").max(500, "Too Long!").required("Required"),
    author: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  });

  useEffect(() => {
    setProgressValue(nextSteps * 34);
  }, [nextSteps]);

  const handleFormDataUpdates = (e: any) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  return (
    <Box>
      <Progress value={progressValue} />
      <Flex justifyContent="center" alignItems="center" mt={20}>
        <Box>
          <Box w={[300, 400, 500]} m={10}>
            <Text
              mb={"2.5"}
              fontWeight="semibold"
              fontSize={["md", "lg"]}
              className="underline--magical"
            >
              {nextSteps === 1 && "Just need a few details to get your course up"}
              {nextSteps === 2 && "Add notes for your course [supports MD]"}
              {nextSteps === 3 && "Add Videos for you course"}
            </Text>
            {nextSteps > 1 && (
              <Link
                onClick={() => {
                  if (nextSteps === 3 && formData.courseType === "Video Only") {
                    setNextSteps(1);
                  } else {
                    setNextSteps(nextSteps - 1);
                  }
                }}
              >
                <Text as="u">{"← Go Back"}</Text>
              </Link>
            )}
          </Box>
          {nextSteps === 2 ? (
            <Box w={[400, 500, 600]} mt={20}>
              <MdEditor
                currentFormData={formData}
                setFormData={setFormData}
                setNextSteps={setNextSteps}
              />
            </Box>
          ) : nextSteps === 1 ? (
            <Box w={[300, 400, 500]} m={10}>
              <Formik
                initialValues={{
                  courseName: formData?.courseName,
                  courseType: formData?.courseType,
                  description: formData?.description,
                  isPublished: formData?.isPublished,
                  author: user?.email,
                }}
                validationSchema={courseValidationSchema}
                onSubmit={(values, { setSubmitting, setFieldError }) => {
                  setFormData({ ...formData, ...values });
                  // If Notes only set to 2, if videos only set to 3, else set to 2
                  if (values.courseType === "Video Only") {
                    setNextSteps(3);
                  } else {
                    setNextSteps(2);
                  }
                  setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form>
                    <Field name="courseName">
                      {({ field, form }: any) => (
                        <FormControl isInvalid={form.errors.courseName && form.touched.courseName}>
                          <FormLabel htmlFor="courseName">Course name</FormLabel>
                          <Input
                            size="md"
                            {...field}
                            id="courseName"
                            placeholder="Course Name"
                            value={formData.courseName}
                            onChange={(e) => {
                              handleFormDataUpdates(e);
                              props.handleChange(e);
                            }}
                          />
                          <FormErrorMessage>{form.errors.courseName}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="courseType">
                      {({ field, form, handleBlur, handleChange }: any) => (
                        <FormControl isInvalid={form.errors.courseType && form.touched.courseType}>
                          <FormLabel htmlFor="courseType">Course Type</FormLabel>
                          <Select
                            {...field}
                            id="courseType"
                            placeholder="Select Course Type"
                            value={formData.courseType}
                            onChange={(e) => {
                              handleFormDataUpdates(e);
                              props.handleChange(e);
                            }}
                          >
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
                            value={formData?.description}
                            onChange={(e) => {
                              handleFormDataUpdates(e);
                              props.handleChange(e);
                            }}
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
                          <Switch
                            id="isPublished"
                            {...field}
                            value={formData?.isPublished}
                            defaultChecked={formData?.isPublished}
                            onChange={(e) => {
                              handleFormDataUpdates(e);
                              props.handleChange(e);
                            }}
                          />
                          <FormErrorMessage>{form.errors.isPublished}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="author">
                      {({ field, form, handleBlur }: any) => (
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
                    <Button
                      variant="outline"
                      borderColor="teal.700"
                      _hover={{ bg: "blue.400", borderColor: "teal.700" }}
                      mt={10}
                      mr={10}
                      className="button add"
                      type="submit"
                      isLoading={props.isSubmitting}
                    >
                      Continue
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          ) : nextSteps === 3 ? (
            <Box w={[400, 500, 600]} mt={20}>
              <FilePicker
                currentFormData={formData}
                setCurrentFormData={setFormData}
                setnextSteps={setNextSteps}
              />
            </Box>
          ) : (
            nextSteps === 4 && null
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateCourse;
