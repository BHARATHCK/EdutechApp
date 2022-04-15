import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Course } from "./Course";

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  videoUrl: string;

  @Column()
  videoTitle: string;

  @Column({ nullable: true })
  videoDescription: string;

  @Column()
  author: string;

  @ManyToOne(() => Course, (course) => course.videos)
  course: Course;
}
