import redaxios from "redaxios";
import { User } from "../types";

export async function getCurrentUser(): Promise<User> {
  const response = await redaxios.get(`${process.env.REACT_APP_BACKEND_URL}/me`, {
    withCredentials: true,
  });
  return response.data;
}

export async function signUp(params: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
}): Promise<User> {
  const response = await redaxios.post(
    `${process.env.REACT_APP_BACKEND_URL}/signup`,
    { params },
    { withCredentials: true },
  );
  return response.data;
}
