import { Box, Button, Center, Flex, Spacer, Text, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCourse } from "../../api/course";
import { Course, Video } from "../../types";
import Header from "../Header/Header";
import ReactPlayer from "react-player";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import "./CoursePage.styles.scss";

const CoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({} as Course);
  const [currVideo, setCurrVideo] = useState([] as any);
  const [viewNotes, setViewNotes] = useState(false);
  const [currVideoUrl, setCurrVideoUrl] = useState("");
  const courseid = parseInt(courseId || "");
  const [isLargerThan980] = useMediaQuery("(min-width: 980px)");
  const [isLesserThan400] = useMediaQuery("(max-width: 400px)");
  let currentIndex = 0;
  let currentVideoToPlay = course?.videos ? course.videos[0] : null;

  useEffect(() => {
    if (!courseId) return;
    getCourse({ courseId: courseid })
      .then((data: Course) => {
        console.log("RESPONSE : ", data);
        setCourse(data);
      })
      .catch((error) => {
        navigate("/error", {
          state: {
            message: "Oops! Looks like this course is not available",
            appStatus: 404,
          },
        });
      });
  }, [courseid]);

  useEffect(() => {
    if (course && course?.videos) {
      setCurrVideoUrl(course?.videos[0].videoUrl);
      setCurrVideo(course.videos[0]);
    }
  }, [course]);

  const handleViewNotes = () => {
    setViewNotes(!viewNotes);
  };

  function move(advance = true) {
    currentIndex =
      (currentIndex + (advance ? 1 : -1) + course.videos.length) % course.videos.length;
    currentVideoToPlay = course.videos[currentIndex];
    setCurrVideoUrl(currentVideoToPlay.videoUrl);
    setCurrVideo(currentVideoToPlay);
  }

  return (
    <>
      <Flex justifyContent="center">
        {!courseId && <>Nothing to see here !!</>}
        {viewNotes && (
          <MDEditor.Markdown source={course.notes} rehypePlugins={[[rehypeSanitize]]} />
        )}

        <Flex
          direction={{ base: "column", md: "row" }}
          hidden={viewNotes}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width={isLesserThan400 ? "100vw" : [null, null, 800]}
            m={isLesserThan400 ? 0 : 10}
            h="100%"
            boxShadow={isLesserThan400 ? "" : "lg"}
            borderRadius="lg"
            className="courseVideoPlayer"
          >
            <Center h="100%">
              <Box justifyContent="center" mt={10} mb={10}>
                <ReactPlayer
                  width={isLesserThan400 ? "100vw" : 640}
                  controls={true}
                  url={currVideoUrl}
                  pip={viewNotes}
                  onDisablePIP={() => {
                    setViewNotes(false);
                  }}
                />
                <Flex flexDir="column" m={10}>
                  <Box>
                    <Text fontSize="md" fontWeight="bold" mt="4">
                      {currVideo.videoTitle}
                    </Text>
                    <Text fontSize="md" fontWeight="light" mt="4">
                      {currVideo.videoDescription}
                    </Text>
                  </Box>
                  <Button
                    onClick={handleViewNotes}
                    isDisabled={course.notes ? false : true}
                    mt={10}
                    variant="outline"
                    _hover={{ bg: "blue.400", borderColor: "teal.700" }}
                  >
                    View Notes
                  </Button>
                  {isLargerThan980 ? null : (
                    <>
                      <Box ml={10} mr={10}>
                        <Flex flexDir="row">
                          <Button
                            onClick={() => {
                              move(false);
                            }}
                            mt={10}
                            variant="outline"
                            _hover={{ bg: "blue.400", borderColor: "teal.700" }}
                          >
                            Prev
                          </Button>
                          <Spacer />
                          <Button
                            onClick={() => {
                              move();
                            }}
                            mt={10}
                            variant="outline"
                            _hover={{ bg: "blue.400", borderColor: "teal.700" }}
                          >
                            Next
                          </Button>
                        </Flex>
                      </Box>
                    </>
                  )}
                </Flex>
              </Box>
            </Center>
            <Spacer />
          </Box>
          {isLargerThan980 ? (
            <Box
              w={[300, 400, 500]}
              boxShadow="lg"
              m={10}
              overflowY="scroll"
              borderRadius="lg"
              className="courseNavBar"
            >
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
                  </>
                ))}
            </Box>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default CoursePage;
