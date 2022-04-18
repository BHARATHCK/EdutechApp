import { User } from "../types";
import redaxios from "redaxios";

export async function login(loginData: any) {
  const user = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, loginData);
  return user.json();
}

export async function Login(params: { email: string; password: string }): Promise<User> {
  const response = await redaxios.post(
    `${process.env.REACT_APP_BACKEND_URL}/login`,
    { params },
    { withCredentials: true },
  );

  return response.data;
}

export async function logout() {
  const response = await redaxios.delete(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
    withCredentials: true,
  });
  return response.data.data;
}
