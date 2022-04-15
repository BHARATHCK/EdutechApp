import { Box, Text, Link, VStack, Code, Grid, theme, Button } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { Logo } from "../../Logo";
import useAuth from "../../useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
        </VStack>
      </Grid>
      <Button
        onClick={() => {
          navigate("/createcourse");
        }}
      >
        Click to show user
      </Button>
    </Box>
  );
};

export default Home;
