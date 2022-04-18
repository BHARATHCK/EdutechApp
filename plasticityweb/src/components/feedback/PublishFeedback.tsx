import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as PublishSVG } from "../../assets/published_success.svg";
import PlasticityButton from "../PlasticityButton/PlasticityButton";

const PublishFeedback = () => {
  const navigate = useNavigate();
  const { state }: any = useLocation();
  return (
    <Flex flexDir="column" alignItems="center">
      <Box w={[300, 400, 500]} m={10}>
        <PublishSVG />
        <Flex flexDir="column" alignItems="center" gap={5} mt={10}>
          {state.isSuccess ? (
            <>
              <Flex flexDir="row" gap={5}>
                <CheckCircleIcon color="green.600" fontSize="large" />
                <Box>Course has been published successfully</Box>
              </Flex>

              <PlasticityButton
                addMargin={true}
                handleClick={() => {
                  navigate("/dashboard");
                }}
                isSubmitting={false}
                variant="outline"
                text="Go to Dashboard"
              />
            </>
          ) : (
            <>
              <Flex flexDir="row" gap={5}>
                <CloseIcon color="red.600" fontSize="large" />
                <Text>Unable to publish the course.</Text>
              </Flex>

              <PlasticityButton
                addMargin={true}
                handleClick={() => {
                  navigate("/createcourse");
                }}
                isSubmitting={false}
                variant="outline"
                text="Please Try again"
              />
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default PublishFeedback;
