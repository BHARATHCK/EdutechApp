export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
}

export interface Course {
  thumbnail: string;
  id: number;
  courseName: string;
  courseType: string;
  notes: string;
  isPublished: boolean;
  author: string;
  videos: Video[];
}

export interface Video {
  id: number;
  videoUrl: string;
  videoTitle: string;
  author: string;
  videoDescription: string;
}

export interface appError {
  message: string;
  appStatus: number;
}
