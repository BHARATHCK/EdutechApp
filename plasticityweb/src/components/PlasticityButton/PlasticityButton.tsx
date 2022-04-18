import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { ReactEventHandler } from "react";

interface Props {
  isSubmitting: boolean;
  variant: string;
  handleClick: ReactEventHandler;
  text: string;
  addMargin: boolean;
}

const PlasticityButton = (props: Props) => {
  return (
    <Button
      variant={props.variant}
      borderColor="teal.700"
      _hover={{ bg: "blue.400", borderColor: "teal.700" }}
      mt={props.addMargin ? 10 : ""}
      mr={props.addMargin ? 10 : ""}
      onClick={props.handleClick}
      type="submit"
      isLoading={props.isSubmitting}
    >
      {props.text}
    </Button>
  );
};

export default PlasticityButton;
