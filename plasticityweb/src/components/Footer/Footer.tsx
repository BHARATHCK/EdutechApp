import { Box, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="center"
      wrap="wrap"
      padding={6}
      bg="white"
      color="black"
      mt={20}
    >
      Made with ❤️ &nbsp; at GeekyAnts
    </Flex>
  );
};
export default Footer;
