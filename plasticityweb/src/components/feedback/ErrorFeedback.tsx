import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import PlasticityButton from "../PlasticityButton/PlasticityButton";
import "./ErrorFeedback.styles.scss";

const ErrorFeedback = (props: any) => {
  const { state }: any = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Flex flexDir="column" alignItems="center">
        <Box w={[400, 600, 800]} h={[400, 600, 800]} className="not-found-bg"></Box>
        <Box>
          <Text fontSize="large" fontWeight="semibold">
            {state.message}
          </Text>
        </Box>
        <PlasticityButton
          handleClick={() => {
            navigate("/dashboard");
          }}
          isSubmitting={false}
          text="Dashboard"
          variant="outline"
          addMargin={true}
        />
      </Flex>
    </>
  );
};

export default ErrorFeedback;
