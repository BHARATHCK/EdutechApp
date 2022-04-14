import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import useAuth, { AuthProvider } from "./useAuth";
import { BrowserRouter, Routes, Route, RouteProps, Navigate } from "react-router-dom";
import AuthScreen from "./components/Login";
import Home from "./components/Home/Home";

export const App = () => {
  function Router() {
    const { user, loading, error } = useAuth();
    return (
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace={true} to="/login" />} />
        <Route path="/login" element={user ? <Home /> : <AuthScreen />} />
        <Route path="/sign_up" element={user ? <Home /> : <AuthScreen />} />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Router />
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
