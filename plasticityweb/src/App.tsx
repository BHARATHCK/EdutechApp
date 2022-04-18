import * as React from "react";
import { ChakraProvider, Flex, Spacer, theme } from "@chakra-ui/react";
import useAuth, { AuthProvider } from "./useAuth";
import { BrowserRouter, Routes, Route, RouteProps, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CoursePage from "./components/CoursePage/CoursePage";
import PublishFeedback from "./components/feedback/PublishFeedback";
import LandingPage from "./components/LandingPage/LandingPage";
import ErrorFeedback from "./components/feedback/ErrorFeedback";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Login/SignUpForm";

export const App = () => {
  function Router() {
    const { user, loading, error } = useAuth();
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* element={user ? <LandingPage /> : <Navigate replace={true} to="/login" />} */}
        <Route path="/login" element={user ? <LandingPage /> : <LoginForm />} />
        <Route path="/signup" element={user ? <LandingPage /> : <SignUpForm />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate replace={true} to="/login" />}
        />
        <Route path="/createcourse" element={user ? <CreateCourse /> : <LoginForm />} />
        <Route path="/error" element={user ? <ErrorFeedback /> : <LoginForm />} />
        <Route path="/publish" element={user ? <PublishFeedback /> : <LoginForm />} />
        <Route path="/course" element={user ? <CoursePage /> : <LoginForm />}>
          <Route path=":courseId" element={<CoursePage />} />
        </Route>
        <Route
          path="*"
          element={
            <div style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </div>
          }
        />
      </Routes>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Flex flexDir="column" height="100vh">
            <Header />
            <Spacer />
            <Router />
            <Spacer />
            <Footer />
          </Flex>
        </ChakraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
