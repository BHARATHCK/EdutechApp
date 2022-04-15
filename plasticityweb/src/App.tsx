import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import useAuth, { AuthProvider } from "./useAuth";
import { BrowserRouter, Routes, Route, RouteProps, Navigate } from "react-router-dom";
import AuthScreen from "./components/Login";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CoursePage from "./components/CoursePage/CoursePage";

export const App = () => {
  function Router() {
    const { user, loading, error } = useAuth();
    return (
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate replace={true} to="/login" />} />
        <Route path="/login" element={user ? <Home /> : <AuthScreen />} />
        <Route path="/sign_up" element={user ? <Home /> : <AuthScreen />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <AuthScreen />} />
        <Route path="/createcourse" element={user ? <CreateCourse /> : <AuthScreen />} />
        <Route path="/course" element={user ? <CoursePage /> : <AuthScreen />}>
          <Route path=":courseId" element={<CoursePage />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
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
