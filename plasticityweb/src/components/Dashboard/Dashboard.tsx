import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  SimpleGrid,
  Skeleton,
  Spacer,
} from "@chakra-ui/react";
import useAuth from "../../useAuth";
import { deleteCourse } from "../../api/course";
import { Course } from "../../types";
import ButtonChip from "../ButtonChip/ButtonChip";
import { Link, Outlet } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useFetchAllCourses } from "../../useFetch";

const Dashboard = () => {
  const { user } = useAuth();
  const {
    isFetching: isLoaded,
    data: courses,
    setClearCache,
  } = useFetchAllCourses(process.env.REACT_APP_BACKEND_URL);

  return (
    <div>
      <Flex flexDir="row" gap={10} justifyContent="center" mt={10} mb={10} alignItems="center">
        <ButtonChip
          onClick={() => {
            console.log("check");
          }}
          buttonName="Video Based Courses"
        />
        <ButtonChip buttonName="Text Based Courses" />
      </Flex>
      <Skeleton isLoaded={!isLoaded} width="100vw" height={!isLoaded ? "" : 600}>
        <SimpleGrid columns={[1, 3, 4]} spacing="20px" m={10}>
          {courses &&
            courses.map((course: Course) => (
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer">
                <Link to={`/course/${course.id}`} key={course.id}>
                  <Image
                    src={
                      course.thumbnail ||
                      "https://www.freecodecamp.org/news/content/images/2021/06/Ekran-Resmi-2019-11-18-18.08.13.png"
                    }
                  />
                </Link>
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
                    <Spacer />
                    {course.author === user.email && user.role === "teacher" ? (
                      <Box ml={2}>
                        <IconButton
                          onClick={() => {
                            deleteCourse({ courseId: course.id })
                              .then((data) => {
                                setClearCache(true);
                              })
                              .catch((error) => {});
                          }}
                          backgroundColor="red.600"
                          color="white"
                          colorScheme="red"
                          aria-label="Search database"
                          icon={<DeleteIcon />}
                        />
                      </Box>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Skeleton>
      <Outlet />
    </div>
  );
};

export default Dashboard;
