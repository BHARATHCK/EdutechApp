import { Box, Stack, Heading, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchBar from "../SearchBar/Searchbar";
import useAuth from "../../useAuth";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../api/sessionAPI";

const Header = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user, logout: sessionLogout } = useAuth();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="white"
      color="black"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"tighter"}>
          <Link to="/dashboard">
            <Text>Plasticity Academy</Text>
          </Link>
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>

      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <SearchBar />
      </Stack>

      <Box display={{ base: isOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
        {user?.role === "teacher" && (
          <Button
            variant="outline"
            _hover={{ bg: "blue.400", borderColor: "teal.700" }}
            mr={5}
            onClick={() => {
              navigate("/createcourse");
            }}
          >
            Create Course
          </Button>
        )}
        {user ? (
          <Button
            variant="outline"
            _hover={{ bg: "blue.400", borderColor: "teal.700" }}
            onClick={() => {
              logout();
              navigate("/");
              sessionLogout();
            }}
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="outline"
            _hover={{ bg: "blue.400", borderColor: "teal.700" }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
