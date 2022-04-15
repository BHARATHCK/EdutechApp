import { Box } from "@chakra-ui/react";
import { useState } from "react";

const ButtonChip = ({ buttonName }: any) => {
  const [buttonColor, setButtonColor] = useState("#f5f6f7");

  const handlebuttonColor = (color: string) => {
    if (buttonColor === color) {
      setButtonColor("#f5f6f7");
    } else {
      setButtonColor(color);
    }
  };

  return (
    <Box
      as="button"
      height="24px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      px="8px"
      borderRadius="2px"
      fontSize="14px"
      fontWeight="semibold"
      bg={buttonColor}
      borderColor="#ccd0d5"
      color="blackAlpha.900"
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      _focus={{
        boxShadow: "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
      onClick={() => handlebuttonColor("blue.400")}
    >
      {buttonName}
    </Box>
  );
};

export default ButtonChip;
