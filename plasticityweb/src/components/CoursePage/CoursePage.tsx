import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../api/course";
import { Course, Video } from "../../types";
import Header from "../Header/Header";
import ReactPlayer from "react-player";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({} as Course);
  const [viewNotes, setViewNotes] = useState(false);
  const [currVideoUrl, setCurrVideoUrl] = useState("");
  const courseid = parseInt(courseId || "");

  useEffect(() => {
    if (!courseId) return;
    getCourse({ courseId: courseid }).then((data: Course) => {
      setCourse(data);
    });
  }, [courseid]);

  useEffect(() => {
    if (course && course?.videos) {
      setCurrVideoUrl(course?.videos[0].videoUrl);
    }
  }, [course]);

  const handleViewNotes = () => {
    setViewNotes(!viewNotes);
  };

  return (
    <>
      <Header />
      <Flex justifyContent="center">
        {!courseId && <>Nothing to see here !!</>}
        <Flex direction={{ base: "column", md: "row" }}>
          <Box w={[300, 400, 500]} m={10} h="100%">
            <Center h="100%">
              <Box justifyContent="center" mt={10} mb={10}>
                <ReactPlayer controls={true} url={currVideoUrl} pip={viewNotes} />
                <Button
                  onClick={handleViewNotes}
                  mt={10}
                  variant="outline"
                  _hover={{ bg: "blue.400", borderColor: "teal.700" }}
                >
                  View Notes
                </Button>
              </Box>
            </Center>
            <Spacer />
          </Box>
          <Box maxH={800} w={[300, 400, 500]} boxShadow="lg" m={10} overflowY="scroll">
            {course.videos &&
              course?.videos.map((video: Video) => (
                <>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                  <Box
                    key={video.id}
                    m={10}
                    borderRadius="md"
                    boxShadow="md"
                    cursor="pointer"
                    onClick={() => {
                      setCurrVideoUrl(video.videoUrl);
                    }}
                  >
                    <Text fontSize="lg">{video.videoTitle}</Text>
                    <Text fontSize="sm">{video.videoDescription}</Text>
                  </Box>
                </>
              ))}
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default CoursePage;
