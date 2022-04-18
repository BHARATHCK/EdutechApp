import { Course } from "../types";
import redaxios from "redaxios";

export async function createCourse(params: {
  courseName: string;
  courseType: string;
  notes: string;
  isPublished: boolean;
  author: string;
  video: string;
}): Promise<Course> {
  const response = await redaxios.post(
    "http://localhost:3000/createcourse",
    { params },
    { withCredentials: true },
  );
  return response.data;
}

export async function getAllCourses(): Promise<Course[]> {
  const response = await redaxios.get("http://localhost:3000/courses", { withCredentials: true });
  return response.data;
}

export async function getCourse(params: { courseId: number }): Promise<Course> {
  const response = await redaxios.post(
    "http://localhost:3000/course",
    { params },
    { withCredentials: true },
  );
  return response.data;
}

export async function deleteCourse(params: { courseId: number }): Promise<Course> {
  const response = await redaxios.post(
    "http://localhost:3000/deleteCourse",
    { params },
    { withCredentials: true },
  );

  return response.data;
}
