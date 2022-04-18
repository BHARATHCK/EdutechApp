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

    try {
      course = await this.courseRepository.findOne({
        where: {
          id: parseInt(request.body.params.courseId),
        },
        relations: {
          videos: true,
        },
      });
      if (!course) {
        course = 404;
      }
    } catch (error) {
      course = { error: error };
    }

    return course;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const newVideos: Video[] = [];
    const newCourse = new Course();
    try {
      newCourse.author = request.body.params.author;
      newCourse.courseName = request.body.params.courseName;
      newCourse.courseType = request.body.params.courseType;
      newCourse.isPublished = request.body.params.isPublished;
      newCourse.notes = request.body.params.notes;

      // Handle videos
      request.body.params.videos.map((video: Video) => {
        // Create all videos
        const newVideo = new Video();
        newVideo.author = video.author;
        newVideo.videoTitle = video.videoTitle;
        newVideo.videoUrl = video.videoUrl;
        newVideo.videoDescription = video.videoDescription;
        newVideo.course = newCourse;

        //Push to video[] entity
        newVideos.push(newVideo);
      });
    } catch (error) {
      return 500;
    }

    let entitySaved = 200;
    try {
      await this.courseRepository.save(newCourse);
      await this.videoRepository.save(newVideos);
    } catch (error) {
      entitySaved = 400;
    }

    return entitySaved;
  }

  async deleteCourseById(request: Request, response: Response, next: NextFunction) {
    if (!request.session.user) {
      return 401;
    }

    let isDeleted = true;
    try {
      let courseToRemove = await this.courseRepository.findOne({
        where: { id: parseInt(request.body.params.courseId) },
        relations: {
          videos: true,
        },
      });

      if (!courseToRemove) {
        return 404;
      }

      await this.videoRepository.remove(courseToRemove.videos);
      await this.courseRepository.delete({ id: courseToRemove.id });
    } catch (error) {
      console.log("Error while deleting : ", error);
      isDeleted = false;
    }

    return isDeleted;
  }
}
