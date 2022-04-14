import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as sessionsApi from "./api/sessionAPI";
import * as usersApi from "./api/users";
import { User } from "./types";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, firstName: string, lastName: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Export the provider to wrap the entire app with it.
export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  // reset the error state.
  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  // On initial load check if there is an active session in backend for current user based on cookies
  useEffect(() => {
    usersApi
      .getCurrentUser()
      .then((responseUser: User) => {
        setUser(responseUser);
      })
      .catch((_error: any) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  // Login function to verify user and set user state on success and redirect to home.
  function login(email: string, password: string) {
    setLoading(true);

    sessionsApi
      .Login({ email, password })
      .then((user: User) => {
        setUser(user);
        navigate("/");
      })
      .catch((error: any) => setError(error))
      .finally(() => setLoading(false));
  }

  // SignUp function to create user, On success update user state and redirect user
  function signUp(email: string, firstName: string, lastName: string, password: string) {
    setLoading(true);

    usersApi
      .signUp({ email, firstName, lastName, password })
      .then((user: User) => {
        setUser(user);
        navigate("/");
      })
      .catch((error: any) => setError(error))
      .finally(() => setLoading(false));
  }

  // Logout
  function logout() {
    sessionsApi.logout().then(() => setUser(undefined));
  }

  // memo the user auth related data.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error],
  );

  // If user is available already the memo will be used on re-renders
  return (
    <AuthContext.Provider value={memoedValue}>{!loadingInitial && children}</AuthContext.Provider>
  );
}

// Export useAuth for accessing the context
export default function useAuth() {
  return useContext(AuthContext);
}
