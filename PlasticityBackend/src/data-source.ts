import "reflect-metadata";
import { DataSource } from "typeorm";
import { Course } from "./entity/Course";
import { User } from "./entity/User";
import { Video } from "./entity/Video";
require("dotenv").config();

export const AppDataSource = new DataSource({
  type: "postgres",
  synchronize: true,
  logging: false,
  entities: [User, Course, Video],
  migrations: [],
  subscribers: [],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  url: process.env.POSTGRES_DB_URL,
});
