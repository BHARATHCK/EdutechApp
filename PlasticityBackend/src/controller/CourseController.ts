import { NextFunction, Request, response, Response } from "express";
import { Course } from "../entity/Course";
import { AppDataSource } from "../data-source";
import { Video } from "../entity/Video";

export class CourseController {
  private courseRepository = AppDataSource.getRepository(Course);
  private videoRepository = AppDataSource.getRepository(Video);

  async getAllCourses(request: Request, response: Response, next: NextFunction) {
    if (!request.session || !request.session.user) {
      return 401;
    }
    return await this.courseRepository.find();
  }

  async getCourseById(request: Request, response: Response, next: NextFunction) {
    let course: any;
    console.log("COURSE ID RECEIVED ******* : ", request.body.params.courseId);
    try {
      course = await this.courseRepository.findOne({
        where: {
          id: parseInt(request.body.params.courseId),
        },
        relations: {
          videos: true,
        },
      });
    } catch (error) {
      console.log("ERROR OCCURED : ", error);
      course = { error: error };
    }

    return course;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const newCourse = new Course();
    newCourse.author = request.body.params.author;
    newCourse.courseName = request.body.params.courseName;
    newCourse.courseType = request.body.params.courseType;
    newCourse.isPublished = request.body.params.isPublished;
    newCourse.notes = request.body.params.notes;

    const newVideo = new Video();
    newVideo.author = request.body.params.author;
    newVideo.videoTitle = request.body.params.video.title;
    newVideo.videoUrl = request.body.params.video.url;
    newVideo.videoDescription = request.body.params.video.description;
    newVideo.course = newCourse;
    let entitySaved = true;
    try {
      await this.courseRepository.save(newCourse);
      await this.videoRepository.save(newVideo);
    } catch (error) {
      console.log(error);
      entitySaved = false;
    }

    return entitySaved;
  }
}
