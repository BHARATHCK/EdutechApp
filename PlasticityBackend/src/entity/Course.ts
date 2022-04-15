import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Video } from "./Video";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseName: string;

  @Column()
  courseType: string;

  @Column()
  notes: string;

  @OneToMany(() => Video, (video) => video.course)
  videos: Video[];

  @Column()
  isPublished: boolean;

  @Column({ nullable: true })
  thumbnail: string;

  @Column()
  author: string;
}
