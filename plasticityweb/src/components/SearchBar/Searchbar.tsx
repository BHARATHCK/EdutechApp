import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

const SearchBar = () => {
  return (
    <>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
        <Input w={200} type="text" placeholder="Search for course" />
      </InputGroup>
    </>
  );
};

export default SearchBar;
