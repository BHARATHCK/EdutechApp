import { User } from "../types";
import redaxios from "redaxios";

export async function login(loginData: any) {
  const user = await fetch("http://localhost:3000/login", loginData);
  return user.json();
}

export async function Login(params: { email: string; password: string }): Promise<User> {
  const response = await redaxios.post(
    "http://localhost:3000/login",
    { params },
    { withCredentials: true },
  );

  return response.data;
}

export async function logout() {
  const response = await redaxios.delete("http://localhost:3000/logout", { withCredentials: true });
  return response.data.data;
}
