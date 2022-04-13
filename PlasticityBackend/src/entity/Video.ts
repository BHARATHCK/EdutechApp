import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    videoUrl: string

    @Column()
    videoTitle: string

    @Column()
    thumbnail: string

    @Column()
    author: number

}