import { Box, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as LandingImage2 } from "../../assets/landing_image_2.svg";
import { ReactComponent as LandingImage3 } from "../../assets/landing_image_3.svg";
import { ReactComponent as LandingImage4 } from "../../assets/landing_image_4.svg";
import Header from "../Header/Header";
import PlasticityButton from "../PlasticityButton/PlasticityButton";
import "./LandingPage.style.scss";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex alignItems="center" justifyContent="center" m={10} flexDir="column">
        <Box className="landing-page" w={[400, 500, 1200]} h="lg">
          <Flex
            justifyContent="left"
            alignItems="start"
            flexDir="column"
            className="landing-content"
          >
            <Box w={300} bottom={0}>
              <Text fontWeight="extrabold" fontSize="4xl">
                India’s largest learning platform
              </Text>
            </Box>
            <PlasticityButton
              handleClick={() => {
                navigate("/dashboard");
              }}
              isSubmitting={false}
              text="Get Started"
              variant="outline"
              addMargin={true}
            />
          </Flex>
        </Box>
        <Box w={[400, 500, 1200]} h="lg" m={20}>
          <Flex flexDir="row">
            <Box w="xs">
              <LandingImage2 />
              <Text fontSize="large" fontWeight="bold" mt="4">
                Daily live classes
              </Text>
              <Text fontSize="md" fontWeight="light" mt="4">
                Chat with educators, ask questions, answer live polls, and get your doubts cleared -
                all while the class is going on
              </Text>
            </Box>
            <Spacer />
            <Box w="xs">
              <LandingImage3 />
              <Text fontSize="large" fontWeight="bold" mt="4">
                Practice and revise
              </Text>
              <Text fontSize="md" fontWeight="light" mt="4">
                Learning isn't just limited to classes with our practice section, mock tests and
                lecture notes shared as PDFs for your revision
              </Text>
            </Box>
            <Spacer />
            <Box w="xs">
              <LandingImage4 />
              <Text fontSize="large" fontWeight="bold" mt="4">
                Learn anytime, anywhere
              </Text>
              <Text fontSize="md" fontWeight="light" mt="4">
                One subscription gets you access to all our live and recorded classes to watch from
                the comfort of any of your devices
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box w={[400, 500, 1200]} h="lg" m={20}>
          <Flex flexDir="row" alignItems="center">
            <Box>
              <Flex flexDir="column">
                <Box>
                  <Text fontSize="large" fontWeight="bold" mt="4">
                    Start learning with Plasticity
                  </Text>
                  <Text fontSize="md" fontWeight="light" mt="4">
                    Get unlimited access to structured courses & doubt clearing sessions
                  </Text>
                </Box>
                <Box>
                  <PlasticityButton
                    handleClick={() => {
                      navigate("/dashboard");
                    }}
                    isSubmitting={false}
                    text="Start Learning"
                    variant="outline"
                    addMargin={true}
                  />
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex flexDir="row" alignItems="center">
                <Box m={10}>
                  {/* image stack 1 */}
                  <VStack spacing="24px">
                    <Box
                      boxShadow="lg"
                      borderRadius="2xl"
                      w={300}
                      h={200}
                      className="showcase-image-1"
                    >
                      <Text fontSize="md" fontWeight="semibold" m={10}>
                        1+ Categories
                      </Text>
                    </Box>
                    <Box
                      boxShadow="lg"
                      borderRadius="2xl"
                      w={300}
                      h={200}
                      className="showcase-image-2"
                    >
                      <Text fontSize="md" fontWeight="semibold" m={10}>
                        Daily Live classes
                      </Text>
                    </Box>
                    <Box
                      boxShadow="lg"
                      borderRadius="2xl"
                      w={300}
                      h={200}
                      className="showcase-image-3"
                    >
                      <Text fontSize="md" fontWeight="semibold" m={10}>
                        5+ Mins Watched
                      </Text>
                    </Box>
                  </VStack>
                </Box>
                <Box m={10}>
                  {/* Image stack 2 */}
                  <VStack spacing="24px">
                    <Box
                      boxShadow="lg"
                      borderRadius="2xl"
                      w={300}
                      h={200}
                      className="showcase-image-4"
                    >
                      <Text fontSize="md" fontWeight="semibold" m={10}>
                        1+ Educators
                      </Text>
                    </Box>
                    <Box
                      boxShadow="lg"
                      borderRadius="2xl"
                      w={300}
                      h={200}
                      className="showcase-image-5"
                    >
                      <Text fontSize="md" fontWeight="semibold" m={10}>
                        20+ Video Lessons
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default LandingPage;
