import { User } from "../types";
import redaxios from "redaxios";

export async function login(loginData: any) {
  const user = await fetch("http://localhost:3000/login", loginData);
  console.log("RESPONSE login : ", user);
  return user.json();
}

export async function Login(params: { email: string; password: string }): Promise<User> {
  const response = await redaxios.post(
    "http://localhost:3000/login",
    { params },
    { withCredentials: true },
  );

  console.log("RESPONSE Login : ", response);

  return response.data;
}

export async function logout() {
  const response = await redaxios.delete("/api/sessions");

  return response.data.data;
}
