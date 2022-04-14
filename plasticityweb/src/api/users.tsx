import redaxios from "redaxios";
import { User } from "../types";

export async function getCurrentUser(): Promise<User> {
  const response = await redaxios.get("http://localhost:3000/me", { withCredentials: true });
  return response.data;
}

export async function signUp(params: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}): Promise<User> {
  const response = await redaxios.post(
    "http://localhost:3000/signup",
    { params },
    { withCredentials: true },
  );
  return response.data;
}
