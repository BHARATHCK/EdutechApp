import { UserController } from "./controller/UserController";
import { CourseController } from "./controller/CourseController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
  },
  {
    method: "post",
    route: "/signup",
    controller: UserController,
    action: "save",
  },
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "Login",
  },
  {
    method: "delete",
    route: "/logout",
    controller: UserController,
    action: "Logout",
  },
  {
    method: "get",
    route: "/me",
    controller: UserController,
    action: "me",
  },
  {
    method: "post",
    route: "/createcourse",
    controller: CourseController,
    action: "save",
  },
  {
    method: "post",
    route: "/deleteCourse",
    controller: CourseController,
    action: "deleteCourseById",
  },
  {
    method: "get",
    route: "/courses",
    controller: CourseController,
    action: "getAllCourses",
  },
  {
    method: "post",
    route: "/course",
    controller: CourseController,
    action: "getCourseById",
  },
];
