import { Button } from "@chakra-ui/react";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthScreen = () => {
  const [login, setLogin] = useState(true);

  const handleJoin = () => {
    setLogin(!login);
  };

  return (
    <>
      <Button mt={4} colorScheme="teal" onClick={handleJoin}>
        {login ? "Join Plasticity instead?" : "Login"}
      </Button>
      {login ? <LoginForm /> : <SignUpForm />}
    </>
  );
};

export default AuthScreen;
