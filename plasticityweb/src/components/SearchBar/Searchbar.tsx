import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { searchBarRender } from "../../util/constants";

const SearchBar = () => {
  const { pathname } = useLocation();
  return (
    <>
      {searchBarRender.includes(pathname) ? (
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
          <Input w={200} type="text" placeholder="Search for course" />
        </InputGroup>
      ) : null}
    </>
  );
};

export default SearchBar;
