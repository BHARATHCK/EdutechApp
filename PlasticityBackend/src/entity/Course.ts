import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Video } from "./Video"

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    courseName: string

    @Column()
    courseType: string

    @Column()
    notes: string

    @OneToMany(() => Video, (video) => video.author)
    videos: Video[]

    @Column()
    isPublished: boolean

    @Column()
    author: number

}
