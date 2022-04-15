import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
  Input,
  Select,
  SimpleGrid,
  Switch,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import useAuth from "../../useAuth";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import MdEditor from "../MdEditor/MdEditor";
import FilePicker from "../FilePicker/FilePicker";
import { getAllCourses } from "../../api/course";
import { Course } from "../../types";
import Header from "../Header/Header";
import ButtonChip from "../ButtonChip/ButtonChip";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([] as any);

  useEffect(() => {
    getAllCourses().then((data) => {
      setCourses(data);
    });
  }, []);
  return (
    <div>
      <Header />
      <Flex flexDir="row" gap={10} justifyContent="center" mt={10} mb={10} alignItems="center">
        <ButtonChip buttonName="Video Based Courses" />
        <ButtonChip buttonName="Text Based Courses" />
      </Flex>
      <SimpleGrid columns={[1, 3, 4]} spacing="20px" m={10}>
        {courses.map((course: Course) => (
          <Link
            style={{ display: "block", margin: "1rem 0" }}
            to={`/course/${course.id}`}
            key={course.id}
          >
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
              <Image src="https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png" />
              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {course.courseType}
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {course.courseName}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
      <Outlet />
    </div>
  );
};

export default Dashboard;
